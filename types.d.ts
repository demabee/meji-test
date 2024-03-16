type ID = number;

type Address = {
  city: string
  geo: {
    lat: string
    lng: string
  }
  street: string
  suite: string
  zipcode: string
}

type Company = {
  bs: string
  catchPhrase: string
  name: string
}

type User = {
  id: ID
  name: string
  username: string
  website: string
  email: string
  phone: string
  company: Company
  address: Address
}

type Post = {
  body: string
  id: ID
  title: string
  userId: ID
}