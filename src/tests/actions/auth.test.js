import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = "";
describe("Pruebas en auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("StartLogin funciona correctamente", async () => {
    await store.dispatch(startLogin("juan@gmail.com", "123456"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    token = localStorage.setItem.mock.calls[0][1];
    // console.log(localStorage.setItem.mock.calls[0][1])
  });

  test("StartLogin incorrecto", async () => {
    await store.dispatch(startLogin("emailincorrecto@gmail.com", "123456"));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "No hay usuario con ese email",
      "error"
    );

    await store.dispatch(startLogin("juan@gmail.com", "1234567"));
    actions = store.getActions();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Contraseña invalida",
      "error"
    );
  });

  test("StartRegister funciona correctamente", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "abc123456",
        };
      },
    }));

    await store.dispatch(startRegister("test@test.com", "123456", "test"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123456");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("StartCheckoing", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "abc123456",
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "Carlos",
      },
    });
    expect( localStorage.setItem).toBeCalledWith("token","abc123456");
  });
});
