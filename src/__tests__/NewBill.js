/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, waitFor } from "@testing-library/dom"
import user from '@testing-library/user-event'
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH, ROUTES} from "../constants/routes.js";
import mockStore from "../__mocks__/store"
import router from "../app/Router.js";

let newBill
let inputFile
let inputFileGet
describe("Given I am connected as an employee", () => {
  beforeAll(()=> {
    window.localStorage.setItem('user', JSON.stringify({
      type: 'Employee',
      email: "johndoe@email.com",
    }))
    const root = document.createElement("div")
    root.setAttribute("id", "root")
    document.body.append(root)
    router()
    window.onNavigate(ROUTES_PATH.NewBill)
  })
  describe("When I am on NewBill Page", () => {
    beforeAll(() => {
      document.body.innerHTML = NewBillUI()
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const store = null
      newBill = new NewBill({
        document, onNavigate, store, localStorage: window.localStorage
      })
    })


    describe("When I upload a file", () => {
      beforeAll(async () => {
        inputFile = await waitFor(() => screen.getByTestId('file'))
        inputFileGet = jest.fn()
        Object.defineProperty(inputFile, 'files', {
          get: inputFileGet
        })
      })

      test("if it is a wrong extension then It should not save the file in DB", async () => {
        inputFileGet.mockReturnValue([{
          name: 'chucknorris.pdf',
          type: 'text/pdf',
          size: 12345,
          blob: 'some-blob'
        }])

        const createFile = jest.spyOn(newBill, 'createFile')

        fireEvent.change(inputFile)

        expect(inputFile.value).toEqual('')
        expect(createFile).not.toHaveBeenCalled()
      });

      test("if it is a good extension then It should save the file in DB", async () => {
        inputFileGet.mockReturnValue([{
          name: 'chucknorris.png',
          type: 'image/png',
          size: 12345,
          blob: 'some-blob'
        }])

        const createFile = jest.spyOn(newBill, 'createFile')

        fireEvent.change(inputFile)
        expect(createFile).toHaveBeenCalled()
      });

    });
    describe("When I navigate to new Bills", () => {
      test("ih should render form", async () => {
        expect(await screen.findByTestId("expense-name")).toBeTruthy()
        expect(await screen.findByTestId("form-new-bill")).toBeTruthy()
        expect(await screen.findByTestId("expense-type")).toBeTruthy()
        expect(await screen.findByTestId("datepicker")).toBeTruthy()
        expect(await screen.findByTestId("amount")).toBeTruthy()
        expect(await screen.findByTestId("vat")).toBeTruthy()
        expect(await screen.findByTestId("pct")).toBeTruthy()
        expect(await screen.findByTestId("commentary")).toBeTruthy()
        expect(await screen.findByTestId("file")).toBeTruthy()

      })
   
    })
    });
});
