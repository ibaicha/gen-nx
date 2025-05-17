USE nest_db;
CREATE OR REPLACE VIEW ops_view AS
SELECT
    op.id as id,
    op.name as name,
    op.sigle as sigle,
    op.email as email,
    op.telephone as telephone,
    op.adresse as adresse,
    op.prenom_contact as prenom_contact,
    op.nom_contact as nom_contact,
    op.email_contact as email_contact,
    op.telephone_contact as telephone_contact,
    
	top.id as typeOpId,
    top.name as typeOpName,
    
	vi.id as villageId,
    vi.name as villageName,
	lo.id as localiteId,
    lo.name as localiteName,
	sz.id as sousZoneId,
    sz.name as sousZoneName,
	zo.id as zoneId,
    zo.name as zoneName,
    
    poi.id as pointId,
    poi.name as pointName,
    pag.id as pointAgenceId,
    pag.name as pointAgenceName,
    pag.sigle as pointAgenceSigle,
    pagso.id as pointAgenceSocieteId,
    pagso.name as pointAgenceSocieteName,
    pagso.name as pointAgenceSocieteSigle

FROM
	nest_db.op op

    LEFT JOIN
		nest_db.typeop top ON top.id = op.typeOpId
	LEFT JOIN
		nest_db.village vi ON vi.id = op.villageId 
	LEFT JOIN
		nest_db.localite lo ON lo.id = op.localiteId 
	LEFT JOIN
		nest_db.souszone sz ON sz.id = lo.sousZoneId
	LEFT JOIN
		nest_db.zone zo ON zo.id = sz.zoneId 
        
    LEFT JOIN
		nest_db.point poi ON poi.id = op.pointId
		LEFT JOIN
			nest_db.pointagence poia ON poia.pointId = poi.id
        LEFT JOIN
			nest_db.agence pag ON pag.id = poia.agenceId
            LEFT JOIN
				nest_db.societe pagso ON pagso.id = pag.societeId


