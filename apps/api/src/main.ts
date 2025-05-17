/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app/app.module'

const helmet = require('helmet')
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:4200',
        'http://localhost:8080:80',
        'http://localhost:8080',
      ],
      methods: 'GET,POST,PUT,DELETE',
    }, // Configuration fine pour CORS
    snapshot: true, // Amélioration du démarrage si compatible
  })

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle("Ges'Ops")
    .setDescription('Gestion des Organisations Paysannes')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    ) // Ajout d'un schéma d'authentification
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Middleware & Pipes globaux
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true, // Ignore les propriétés non définies dans les DTOs
      forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non autorisées
      transform: true, // Transforme les payloads selon les types des DTOs
    }),
  )

  // app.useGlobalPipes(new ValidationPipe())

  // Ajout de hooks pour une gestion propre de l'arrêt de l'application
  app.enableShutdownHooks()

  // Sécurité

  app.use(helmet()) // Protection des en-têtes HTTP

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: [
        'http://localhost:4200',
        'http://localhost:8080:80',
        'http://localhost:8080',
      ], // Domaines autorisés
      methods: 'GET,POST,PUT,DELETE', // Méthodes HTTP autorisées
      credentials: true, // Autorise les cookies ou les tokens
      allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes acceptés
      exposedHeaders: ['Authorization'], // En-têtes accessibles dans la réponse
      maxAge: 3600, // Cache la réponse pré-cachée pendant 1 heure
    })
  }
  // Gestion dynamique du port
  const port = process.env.PORT || 3000
  await app.listen(port)

  // Logs
  const appUrl = await app.getUrl()
  console.log(`✅ Application is running on: ${appUrl}`)
  console.log(`📖 Swagger documentation available at: ${appUrl}/api`)
}

bootstrap()

/*
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    snapshot: true,
  })
  const config = new DocumentBuilder()
    .setTitle("Ges'Ops")
    .setDescription('Gestions desOrganisations Paysannes')
    .setVersion('1.0')
    .addBearerAuth() // Optionnel, si votre API utilise un système d'authentification
    //.addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(new ValidationPipe())
  //app.enableCors();
  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(`Swagger documentation available at: ${await app.getUrl()}/api`)
}

bootstrap()
*/
