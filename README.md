
![Logo](https://res.cloudinary.com/dicbnntfh/image/upload/v1674304536/spotify-clone/integration_gfnrm7.png)


# [Integration]()

Introducing Integration, which integrates many third party services
like stripe, sendgrid and twilio for different purposes

## Features

- Stripe for Payment
- Twilio for sending the OTP to the phone number
- Sendgrid for sending the customized mails (Not working as of now, because of the account validation) 
- E-Commerce checkout feature


 


## Tech Stack

- [React](https://reactjs.org/docs/create-a-new-react-app.html)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/docs)
- [Twilio](https://www.twilio.com/docs)
- [Sendgrid](https://docs.sendgrid.com/)








## Run Locally

Clone the project

```bash
  git clone https://github.com/anshkush92college/integration
```

Go to the project directory

```bash
  cd integration
```

### Client 

Go to the client directory
```bash
  cd client
```

Install dependencies

```bash
  npm install 
```

Add .env file
```bash
REACT_APP_REQUEST_URL=
```

Start the server
```bash
npm run start
```

### Server 
Go to the server directory
```bash
  cd server
```

Install dependencies

```bash
  npm install 
```

Add .env file
```bash
PORT=
STRIPE_SECRET_KEY=
CLIENT_URL=
SENDGRID_API_KEY=
ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
JWT_AUTH_TOKEN=
JWT_REFRESH_TOKEN=
SMS_SECRET_KEY=
```

Start the server
```bash
npm run dev
```
## Author

- [Ansh Singh](https://www.github.com/anshkush92college)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Roadmap

- Add more integrations like Algolia, Trustpilot 

