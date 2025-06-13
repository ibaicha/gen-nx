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
      /*
      origin: [
        'http://localhost',
        'http://localhost:4200',
        'http://localhost:8080',
        'http://localhost:8082',
      ],
      */
      origin: '*',

      methods: 'GET,POST,PUT,DELETE',
    }, // Configuration fine pour CORS
    snapshot: true, // Amélioration du démarrage si compatible
  })

  // app.setGlobalPrefix('api')
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
      /*
      origin: [
        'http://localhost',
        'http://localhost:4200',
        'http://localhost:8080',
        'http://localhost:8082',
      ], // Domaines autorisés
      */
      origin: '*',
      methods: 'GET,POST,PUT,DELETE,OPTIONS', // Ajout de OPTIONS pour les preflight
      credentials: true, // Autorise les cookies ou les tokens
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
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
