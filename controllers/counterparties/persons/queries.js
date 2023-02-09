const { ParameterizedQuery } = require("pg-promise");

function getPersonQuery(id) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT p.id,
                p.name,
                p.patronym,
                p.surname,
                p.inn,
                json_build_object('regaddress',
                        json_build_object('gar_objectid', 
                                  p.regaddress_ref, 
                                  'text', 
                                  p.regaddress_text),
                        'postaddress',
                        json_build_object('gar_objectid', 
                                  p.postaddress_ref, 
                                  'text', 
                                  p.postaddress_text)
                ) AS address,
                pe.emails,
                pp.phones
              FROM counterparties.persons p
                LEFT JOIN (SELECT pe.person_ref,
                          array_agg(e.email) AS emails
                      FROM counterparties.persons_emails pe
                      LEFT JOIN counterparties.emails e ON 
                          pe.email_ref = e.id
                      GROUP BY pe.person_ref) pe ON p.id = pe.person_ref
                LEFT JOIN (SELECT pp.person_ref,
                          array_agg(json_build_object('number', p.number, 'type', t.fullname)) AS phones
                      FROM counterparties.persons_phones pp
                          LEFT JOIN counterparties.phone_numbers p ON pp.phone_ref = p.id
                          LEFT JOIN counterparties.phone_types t ON pp.phonetype_ref = t.id
                      GROUP BY pp.person_ref) pp ON p.id = pp.person_ref
              WHERE p.id = $1;`,
      values: [id]
    },
  );
  return query;
};

module.exports = {
  getPersonQuery
}