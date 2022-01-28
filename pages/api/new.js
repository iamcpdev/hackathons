import AirtablePlus from 'airtable-plus'

const hackathonsTable = new AirtablePlus({
  baseID: 'apptapPDAi0eBaaG1',
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'applications'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body
    // applicant_email email
    // name text
    // start datetime
    // end datetime
    // Are you a high schooler? yes or no radio
    // hackclub_affiliated checkbox
    // mlh_associated checkbox
    // apac checkbox
    // website url
    // virtual checkbox
    // hybrid checkbox
    // parsed_city
    // parsed_state_code
    // parsed_country
    // expected_attendance numero
    // logo
    // banner

    const hackathon = await hackathonsTable.create({
      applicant_email: data.email,
      name: data.name,
      start: data.start,
      end: data.end,
      'Are you a high schooler?': data.highschool,
      mlh_associated: data.mlh_associated,
      hackclub_affiliated: data.hackclub_affiliated,
      apac: data.apac, // todo
      website: data.website,
      virtual: data.virtual,
      hybrid: data.hybrid,
      parsed_city: data.parsed_city,
      parsed_state_code: data.parsed_state_code,
      parsed_country: data.parsed_country,
      expected_attendance: data.expected_attendance,
      logo: data.logo,
      banner: data.banner
    })
    const url = 'https://hackathons.hackclub.com/api/new/'
    const body = JSON.stringify({
      hackathon
    })
    fetch(url, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => {
        res.redirect('/')
        console.log(r.statusText)
      })
      .catch(error => {
        console.log(error)
        res.json({ status: 'Something went wrong', error })
      })
  } else {
    res.status(405).json({ status: 'error', error: 'Must send POST request' })
  }
}
