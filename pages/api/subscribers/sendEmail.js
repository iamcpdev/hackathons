import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default (req, res) =>
  // fetchEvents
  // filter future events

  // get all subscribers
  // for each subscriber, send email

  // send email
  // send response
  res.status(200).json({
    message: 'Email sent'
  })

const msg = {
  to: 'ella@hackclub.com', // Change to your recipient
  from: 'bank@hackclub.com', // Change to your verified sender
  subject: 'Sending with SendGr',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch(error => {
    console.error(error)
  })
