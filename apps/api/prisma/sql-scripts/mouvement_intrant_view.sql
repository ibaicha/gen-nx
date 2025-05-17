CREATE VIEW nest_db.mouvements_intrant_view AS
SELECT

	mi.id as id,
    mi.date as date,
    mi.pu as pu,
    mi.quantiteEntreeEmballage as quantiteEntreeEmballage,
    mi.quantiteSortieEmballage as quantiteSortieEmballage,
    mi.nombreUnite as nombreUnite,
    mi.valeur as valeur,
    mi.lot as lot,
   
	an.id as anneeId,
    an.name as anneeName,
    an.valeur as anneeValeur,
    sa.id as saisonId,
    sa.name as saisonName,
    sa.description as saisonDescription,
    
    che.id as chargeExploitationId,
    che.name as chargeExploitationName,
    ceug.id as chargeExploitationUniteGrandeurId,
    ceug.name as chargeExploitationUniteGrandeurName,
    embi.id as emballageIntrantId,
    embi.name as emballageIntrantName,

	op.id as opId,
    op.name as opName,
    op.sigle as opSigle,
	fo.id as fournisseurId,
    fo.name as fournisseurName,
    fo.sigle as fournisseurSigle,
    
    mes.id as modeEntreeSortieIntrantId,
    mes.name as modeEntreeSortieIntrantName,
    em.id as emplacementId,
    em.name as emplacementName,
	en.id as entrepotId,
    en.name as entrepotName,
    poi.id as pointId,
    poi.name as pointName,
    ems.id as emplacementSourceId,
    ems.name as emplacementSourceName,
    ens.id as entrepotSourceId,
    ens.name as entrepotSourceName,
    pois.id as pointSourceId,
    pois.name as pointSourceName,
    emd.id as emplacementDestinationId,
    emd.name as emplacementDestinationName,
    end.id as entrepotDestinationId,
    end.name as entrepotDestinationName,
    poid.id as pointDestinationId,
    poid.name as pointDestinationName,
	
    pag.id as agenceId,
    pag.name as agenceName,
    pag.sigle as agenceSigle,
    pagso.id as societeId,
    pagso.name as societeName,
    pagso.name as societeSigle
        
FROM
	nest_db.mouvementintrant mi
    
LEFT JOIN
	nest_db.modeentreesortieintrant mes ON mes.id = mi.modeEntreeSortieIntrantId
LEFT JOIN
	nest_db.annee an ON an.id = mi.anneeId
LEFT JOIN
	nest_db.saison sa ON sa.id = mi.saisonId
LEFT JOIN
	nest_db.chargeexploitation che ON che.id = mi.chargeExploitationId
	LEFT JOIN
		nest_db.unitegrandeur ceug ON ceug.id = che.uniteGrandeurId
LEFT JOIN
	nest_db.emballageintrant embi ON embi.id = mi.emballageIntrantId
LEFT JOIN
	nest_db.emplacement em ON em.id = mi.emplacementId
    LEFT JOIN
		nest_db.entrepot en ON en.id = em.entrepotId
        LEFT JOIN
			nest_db.point poi ON poi.id = en.pointId
			LEFT JOIN
				nest_db.pointagence poia ON poia.pointId = poi.id
				LEFT JOIN
					nest_db.agence pag ON pag.id = poia.agenceId
					LEFT JOIN
						nest_db.societe pagso ON pagso.id = pag.societeId
    
LEFT JOIN
	nest_db.emplacement ems ON ems.id = mi.emplacementSourceId
    LEFT JOIN
		nest_db.entrepot ens ON ens.id = ems.entrepotId
        LEFT JOIN
			nest_db.point pois ON pois.id = ens.pointId
LEFT JOIN
	nest_db.emplacement emd ON emd.id = mi.emplacementDestinationId
    LEFT JOIN
		nest_db.entrepot end ON end.id = emd.entrepotId
        LEFT JOIN
			nest_db.point poid ON poid.id = end.pointId
		
LEFT JOIN
	nest_db.op op ON op.id = mi.opId
LEFT JOIN
	nest_db.fournisseur fo ON fo.id = mi.fournisseurId