import { ValidationException } from "./validation.exception"
import { ValidationError } from "class-validator"

describe('ValidationException', () => {

  describe('.message', () => {
    it('returns an empty object when there are no errors', () => {
      let subject = new ValidationException([])
      expect(subject.message).toEqual({})
    })

    it('returns all messages for a single field', () => {
      let error = new ValidationError()

      error.property = "name"
      error.constraints = {
        length: "name must be greater than 1 character",
        isNotEmpty: "name must not be empty"
      }

      let subject = new ValidationException([error])

      expect(subject.message).toEqual({
        errors: {
          name: [
            "name must be greater than 1 character",
            "name must not be empty"
          ]
        }
      })
    })

    it('returns all messages for multiple fields', () => {
      let nameError = new ValidationError()
      nameError.property = "name"
      nameError.constraints = {isNotEmpty: "name must not be empty"}

      let urlError = new ValidationError()
      urlError.property = "url"
      urlError.constraints = {isUrl: "url must be a url"}

      let subject = new ValidationException([nameError, urlError])

      expect(subject.message).toEqual({
        errors: {
          name: ["name must not be empty"],
          url: ["url must be a url"]
        }
      })
    })
  })
})
