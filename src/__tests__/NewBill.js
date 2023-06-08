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

  afterEach(()=>{
    jest.clearAllMocks();
  })
  

  describe("When I upload wrong file extension", () => {
   
    test("Then It should not save the file in DB", async() => {
     
  
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      let PREVIOUS_LOCATION = "";
    
      jest.spyOn(mockStore, "bills")
      const newBill = new NewBill({
        document,
        localStorage: window.localStorage,
        onNavigate,
        PREVIOUS_LOCATION,
        store: mockStore,
        handleSubmit: jest.fn(),
        updateBill: jest.fn()
      });
      const inputFile = screen.getByTestId("file");
      const file = new File(['test'], 'chucknorris.pdf', {type: 'text/pdf'})
      user.upload(inputFile, file);
    expect(inputFile.files[0]).toEqual(file)
    expect(mockStore.bills).not.toHaveBeenCalled()

    });
   
    });

  describe("When I upload correct file extension", () => {
    test("Then It should  save the file in DB", async() => {
         
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const mockCreate = jest.fn().mockResolvedValue({filePath: 'https://localhost:3456/images/test.jpg', key: '1234'})
      let PREVIOUS_LOCATION = "";
      jest.spyOn(mockStore, "bills")
        mockStore.bills.mockImplementation(() => {
          return {
            create: mockCreate
          };
        });
      const newBill = new NewBill({
        document,
        localStorage: window.localStorage,
        onNavigate,
        PREVIOUS_LOCATION,
        store: mockStore,
        handleSubmit: jest.fn(),
        updateBill: jest.fn()
      });
      const inputFile = screen.getByTestId("file");
      const file = new File(['test'], 'chucknorris.png', {type: 'image/png'})
      user.upload(inputFile, file);
    expect(inputFile.files[0]).toEqual(file)
    expect(mockStore.bills).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({data: {
      email: 'johndoe@email.com',
      file
    },
      headers: {
        noContentType: true
      }})

    });
    test("Then It should  save the file in DB", async() => {
         
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const mockCreate = jest.fn().mockResolvedValue({filePath: 'https://localhost:3456/images/test.jpg', key: '1234'})
      let PREVIOUS_LOCATION = "";
      jest.spyOn(mockStore, "bills")
        mockStore.bills.mockImplementation(() => {
          return {
            create: mockCreate
          };
        });
      const newBill = new NewBill({
        document,
        localStorage: window.localStorage,
        onNavigate,
        PREVIOUS_LOCATION,
        store: mockStore,
        handleSubmit: jest.fn(),
        updateBill: jest.fn()
      });
      const inputFile = screen.getByTestId("file");
      const file = new File(['test'], 'chucknorris.jpeg', {type: 'image/jpeg'})
      user.upload(inputFile, file);
    expect(inputFile.files[0]).toEqual(file)
    expect(mockStore.bills).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({data: {
      email: 'johndoe@email.com',
      file
    },
      headers: {
        noContentType: true
      }})

    });
    test("Then It should  save the file in DB", async() => {
         
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const mockCreate = jest.fn().mockResolvedValue({filePath: 'https://localhost:3456/images/test.jpg', key: '1234'})
      let PREVIOUS_LOCATION = "";
      jest.spyOn(mockStore, "bills")
        mockStore.bills.mockImplementation(() => {
          return {
            create: mockCreate
          };
        });
      const newBill = new NewBill({
        document,
        localStorage: window.localStorage,
        onNavigate,
        PREVIOUS_LOCATION,
        store: mockStore,
        handleSubmit: jest.fn(),
        updateBill: jest.fn()
      });
      const inputFile = screen.getByTestId("file");
      const file = new File(['test'], 'chucknorris.svg', {type: 'image/svg'})
      user.upload(inputFile, file);
    expect(inputFile.files[0]).toEqual(file)
    expect(mockStore.bills).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({data: {
      email: 'johndoe@email.com',
      file
    },
      headers: {
        noContentType: true
      }})

    });
    });
});
