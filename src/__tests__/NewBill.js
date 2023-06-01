/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, waitFor } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

describe("GGiven I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then It should renders NewBill page", async() => {
      const html = NewBillUI()
      document.body.innerHTML = html

      const inputexpenseType = screen.getByTestId("expense-type");
      expect(inputexpenseType.value).toBe("Transports");

      const inputExpenseName = screen.getByTestId("expense-name");
      expect(inputExpenseName.value).toBe("");

      const inputDatePicker = screen.getByTestId("datepicker");
      expect(inputDatePicker.value).toBe("");

      const inputAmount = screen.getByTestId("amount");
      expect(inputAmount.value).toBe("");

      const inputVat = screen.getByTestId("vat");
      expect(inputVat.value).toBe("");

      const inputPct = screen.getByTestId("pct");
      expect(inputPct.value).toBe("");

      const inputCommentary = screen.getByTestId("commentary");
      expect(inputCommentary.value).toBe("");

      const inputFile = screen.getByTestId("file");
      expect(inputFile.value).toBe("");

      const form = screen.getByTestId("form-new-bill");
      const handleSubmit = jest.fn((e) => e.preventDefault());

      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(screen.getByTestId("form-new-bill")).toBeTruthy();
    });
  });

  describe("When I do  fill all required fields and I click on button Envoyer", () => {
    const status = "En attente"
    const billType = "Transports"
    test("Then It should renders Bill page", async() => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const expenseName = "Repas d'affaire"
      const date = "03/06/2023"
      const amount = 145

      const inputExpenseName = screen.getByTestId("expense-name");
      fireEvent.change(inputExpenseName, { target: { value: expenseName } });
      
      const form = screen.getByTestId("form-new-bill");
      const handleSubmit = jest.fn((e) => e.preventDefault());

      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(screen.getByTestId("form-new-bill")).toBeTruthy();

      const inputDatePicker = screen.getByTestId("datepicker");
      fireEvent.change(inputDatePicker, { target: { value: date } });

      fireEvent.submit(form);
      expect(screen.getByTestId("form-new-bill")).toBeTruthy();

      const inputAmount = screen.getByTestId("amount");
      fireEvent.change(inputAmount, { target: { value: amount } });

      fireEvent.submit(form);
      expect(screen.getByTestId("form-new-bill")).toBeTruthy();

      const inputPct = screen.getByTestId("pct");
      fireEvent.change(inputPct, { target: { value: 20 } });

      fireEvent.submit(form);
      expect(screen.getByTestId("form-new-bill")).toBeTruthy();

      const inputFile = screen.getByTestId("file");
      fireEvent.change(inputFile, { target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})],
      }, });

      fireEvent.submit(form);

    });
    test("It should renders Bills page", async() => {
      expect(screen.getAllByText("Mes notes de frais")).toBeTruthy();
      expect(screen.getByText(billType)).toBeTruthy()
      expect(screen.getByText(expenseName)).toBeTruthy()
      expect(screen.getByText(formatDate(date))).toBeTruthy()
      expect(screen.getByText(amount.toString())).toBeTruthy()
      expect(screen.getByText(status)).toBeTruthy()
    });
    });


//   describe("When I do fill fields in correct format and I click on employee button Login In", () => {
//     test("Then I should be identified as an Employee in app", async() => {
//       document.body.innerHTML = LoginUI();
//       const inputData = {
//         email: "johndoe@email.com",
//         password: "azerty",
//       };

//       const inputEmailUser = screen.getByTestId("employee-email-input");
//       fireEvent.change(inputEmailUser, { target: { value: inputData.email } });
//       expect(inputEmailUser.value).toBe(inputData.email);

//       const inputPasswordUser = screen.getByTestId("employee-password-input");
//       fireEvent.change(inputPasswordUser, {
//         target: { value: inputData.password },
//       });
//       expect(inputPasswordUser.value).toBe(inputData.password);

//       const form = screen.getByTestId("form-employee");

//       // localStorage should be populated with form data
//       Object.defineProperty(window, "localStorage", {
//         value: {
//           getItem: jest.fn(() => null),
//           setItem: jest.fn(() => null),
//         },
//         writable: true,
//       });

//       // we have to mock navigation to test it
//       const onNavigate = (pathname) => {
//         document.body.innerHTML = ROUTES({ pathname });
//       };

//       let PREVIOUS_LOCATION = "";

//       const store = jest.fn();

//       const login = new Login({
//         document,
//         localStorage: window.localStorage,
//         onNavigate,
//         PREVIOUS_LOCATION,
//         store,
//       });

//       const handleSubmit = jest.fn(login.handleSubmitEmployee);
//       login.login = jest.fn().mockResolvedValue({});
//       form.addEventListener("submit", handleSubmit);
//       fireEvent.submit(form);
//       expect(handleSubmit).toHaveBeenCalled();
//       expect(window.localStorage.setItem).toHaveBeenCalled();
//       expect(window.localStorage.setItem).toHaveBeenCalledWith(
//         "user",
//         JSON.stringify({
//           type: "Employee",
//           email: inputData.email,
//           password: inputData.password,
//           status: "connected",
//         })
//       );
//     });

//     test("It should renders Bills page", async() => {
//       expect(screen.getAllByText("Mes notes de frais")).toBeTruthy();
//     });
// });
// });

// describe("Given that I am a user on login page", () => {
//   describe("When I do not fill fields and I click on admin button Login In", () => {
//     test("Then It should renders Login page", async() => {
//       document.body.innerHTML = LoginUI();

//       const inputEmailUser = screen.getByTestId("admin-email-input");
//       expect(inputEmailUser.value).toBe("");

//       const inputPasswordUser = screen.getByTestId("admin-password-input");
//       expect(inputPasswordUser.value).toBe("");

//       const form = screen.getByTestId("form-admin");
//       const handleSubmit = jest.fn((e) => e.preventDefault());

//       form.addEventListener("submit", handleSubmit);
//       fireEvent.submit(form);
//       expect(screen.getByTestId("form-admin")).toBeTruthy();
//     });
//   });

//   describe("When I do fill fields in incorrect format and I click on admin button Login In", () => {
//     test("Then it should renders Login page", async() => {
//       document.body.innerHTML = LoginUI();

//       const inputEmailUser = screen.getByTestId("admin-email-input");
//       fireEvent.change(inputEmailUser, { target: { value: "pasunemail" } });
//       expect(inputEmailUser.value).toBe("pasunemail");

//       const inputPasswordUser = screen.getByTestId("admin-password-input");
//       fireEvent.change(inputPasswordUser, { target: { value: "azerty" } });
//       expect(inputPasswordUser.value).toBe("azerty");

//       const form = screen.getByTestId("form-admin");
//       const handleSubmit = jest.fn((e) => e.preventDefault());

//       form.addEventListener("submit", handleSubmit);
//       fireEvent.submit(form);
//       expect(screen.getByTestId("form-admin")).toBeTruthy();
//     });
//   });

//   describe("When I do fill fields in correct format and I click on admin button Login In", () => {
//     test("Then I should be identified as an HR admin in app", async() => {
//       document.body.innerHTML = LoginUI();
//       const inputData = {
//         type: "Admin",
//         email: "johndoe@email.com",
//         password: "azerty",
//         status: "connected",
//       };

//       const inputEmailUser = screen.getByTestId("admin-email-input");
//       fireEvent.change(inputEmailUser, { target: { value: inputData.email } });
//       expect(inputEmailUser.value).toBe(inputData.email);

//       const inputPasswordUser = screen.getByTestId("admin-password-input");
//       fireEvent.change(inputPasswordUser, {
//         target: { value: inputData.password },
//       });
//       expect(inputPasswordUser.value).toBe(inputData.password);

//       const form = screen.getByTestId("form-admin");

//       // localStorage should be populated with form data
//       Object.defineProperty(window, "localStorage", {
//         value: {
//           getItem: jest.fn(() => null),
//           setItem: jest.fn(() => null),
//         },
//         writable: true,
//       });

//       // we have to mock navigation to test it
//       const onNavigate = (pathname) => {
//         document.body.innerHTML = ROUTES({ pathname });
//       };

//       let PREVIOUS_LOCATION = "";

//       const store = jest.fn();

//       const login = new Login({
//         document,
//         localStorage: window.localStorage,
//         onNavigate,
//         PREVIOUS_LOCATION,
//         store,
//       });

//       const handleSubmit = jest.fn(login.handleSubmitAdmin);
//       login.login = jest.fn().mockResolvedValue({});
//       form.addEventListener("submit", handleSubmit);
//       fireEvent.submit(form);
//       expect(handleSubmit).toHaveBeenCalled();
//       expect(window.localStorage.setItem).toHaveBeenCalled();
//       expect(window.localStorage.setItem).toHaveBeenCalledWith(
//         "user",
//         JSON.stringify({
//           type: "Admin",
//           email: inputData.email,
//           password: inputData.password,
//           status: "connected",
//         })
//       );
//     });

//     test("It should renders HR dashboard page", async() => {
//       expect(screen.queryByText("Validations")).toBeTruthy();
//     });
//   });
});
