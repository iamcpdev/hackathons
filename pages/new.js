import { useState, useEffect, useRef } from 'react'
import { Container, Grid, Box, Button, Input, Label } from 'theme-ui'
import Header from '../components/header'
import Field from '../components/field'
import EventCard from '../components/event-card'

export default () => {
  const [fields, setFields] = useState({
    email: '',
    website: '',
    name: 'My Hackathon',
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
    parsed_city: '',
    parsed_state_code: '',
    parsed_country: '',
    parsed_country_code: '',
    hackclub_affiliated: '',
    mlh_associated: '',
    apac: '',
    virtual: '',
    hybrid: '',
    highschool: '',
    expected_attendance: 0,
    banner: '',
    logo: ''
  })

  const [image, setImage] = useState([])
  const [imageURL, setImageURL] = useState([])

  const onChange = ({ target }) => {
    let { value } = target
    if (target.type === 'checkbox') value = Boolean(value)
    setFields(data => ({ ...data, [target.id]: value }))
  }
  useEffect(() => {
    const newImageUrl = imageURL.map(image => {
      newImageUrl(URL.createObjectURL(image))
    })
    // image(image => newImageUrl(URL.createObjectURL(image)))
    // setImageURL(newImageUrl)
  }, [image])
  const onImageChange = ({ target }) => {
    setImage(data => [...data, target.files[0]])
  }
  const [file, setFile] = useState(null)
  const inputRef = useRef()
  useEffect(() => console.log(fields), [fields]) // for debugging

  return (
    <>
      <Header
        title="Submit your event"
        desc="Fill out your event's details & we'll get back to you within 24 hours."
        key="header"
      />
      <Container
        sx={{
          px: [3, 4],
          mt: [4, 5],
          display: 'grid',
          gridGap: [4, 5],
          gridTemplateColumns: [null, '3fr 2fr'],
          alignItems: 'start'
        }}
      >
        <Box as="form" action="/api/new" method="POST">
          <Grid columns={[null, 2]} gap={[3, 4]}>
            <Field
              label="Your email address"
              name="email"
              type="email"
              desc="If we have any questions about your event, we’ll get in touch through this email."
              placeholder="fiona@hackclub.com"
              value={fields.email}
              onChange={onChange}
            />
            <Field
              label="Name of the hackathon"
              name="name"
              desc="(NOT your name, but the name of your event)"
              value={fields.name}
              onChange={onChange}
            />
            <Field
              label="Start date"
              type="date"
              name="start"
              value={fields.start}
              onChange={onChange}
              half
            />
            <Field
              label="End date"
              type="date"
              name="end"
              value={fields.end}
              onChange={onChange}
              half
            />
            <Field
              label="How many hackers you’re expecting"
              name="expected_attendance"
              type="number"
              min="10"
              max="100"
              value={fields.expected_attendance}
              onChange={onChange}
              placeholder={50}
              half
            />
            <Field
              label="Is this an online event?"
              name="virtual"
              type="checkbox"
              value={fields.virtual}
              onChange={onChange}
              half
            />
            <Field
              label="City where it’s being held"
              name="parsed_city"
              placeholder="San Francisco"
              value={fields.parsed_city}
              onChange={onChange}
              desc="(skip this if your event is online)"
              half
            />
            <Field
              label="State, region, or territory"
              placeholder="CA"
              name="parsed_state_code"
              value={fields.parsed_state_code}
              onChange={onChange}
              desc="(skip this if your event is online)"
              half
            />
            <Field
              label="Country"
              name="parsed_country"
              placeholder="USA"
              value={fields.parsed_country}
              onChange={onChange}
              desc="(skip this if your event is online)"
              half
            />
            <Field
              label="Website"
              name="website"
              type="url"
              value={fields.website}
              onChange={onChange}
              placeholder="https://myhackathon.com"
            />
            <Field
              label="Are you affiliated with a registered Hack&nbsp;Club or Hack&nbsp;Club Bank?"
              name="hackclub_affiliated"
              type="checkbox"
              value={fields.hackclub_affiliated}
              onChange={onChange}
              half
            />
            <Field
              label="Are you a registered MLH member event?"
              name="mlh_associated"
              type="checkbox"
              value={fields.mlh_associated}
              onChange={onChange}
              half
            />

            <Field
              label="Please attach a logo for your event card"
              name="logo"
              type="file"
              accept="image/*"
              value={fields.logo}
              onChange={onChange}
            />
            <Field
              label="Please attach a background image for your event card"
              name="banner"
              type="file"
              accept="image/*"
              value={fields.banner}
              // onChange={onChange}
              onChange={() => setFiles(inputRef.current.files[0])}
              ref={inputRef}
            />
            <Button type="submit">Submit</Button>
          </Grid>
        </Box>

        <Box sx={{ gridRow: [-1, 'auto'] }}>
          <EventCard
            {...fields}
            logo={extractFilename(fields.logo)}
            banner={extractFilename(fields.banner)}
          />
          {/* <EventCard
            key={imageSrc}
            {...fields}
            // logo={extractFilename(fields.logo)}
            logo={imageSrc}
            banner={extractFilename(fields.banner)}
          /> */}
        </Box>
      </Container>
    </>
  )
}

function extractFilename(path) {
  if (path.substr(0, 12) == 'C:\\fakepath\\') return path.substr(12) // modern browser
  var x
  x = path.lastIndexOf('/')
  if (x >= 0)
    // Unix-based path
    return path.substr(x + 1)
  x = path.lastIndexOf('\\')
  if (x >= 0)
    // Windows-based path
    return path.substr(x + 1)
  return path // just the filename
}
