import { Schema } from 'express-validator'

export const postJobListingSchema: Schema = {
  title: {
    in: 'body',
    isString: true,
  },
  body: {
    in: 'body',
    isString: true,
  },
  businessId: {
    in: 'body',
    isInt: true,
  },
}

export const postJobApplicationSchema: Schema = {
  body: {
    in: 'body',
    isString: true,
  },
  jobListingId: {
    in: 'body',
    isInt: true,
  },
}
