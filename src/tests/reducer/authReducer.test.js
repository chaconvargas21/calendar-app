import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  checking: true,
};
describe("Pruebas en authReducer", () => {
  test("debe de retornar su valor inicial", () => {
    const state = authReducer(initialState, {});
    expect(state.checking).toBe(true);
  });
  test("debe de hacer el login", () => {
    const login = {
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "juan",
      },
    };
    const state = authReducer(initialState, login);
    expect(state).toEqual({
      ...login.payload,
      checking: false,
    });
  });
  test("debe de hacer el checkingFinish", () => {
    const checkingFinish = {
      type: types.authCheckingFinish,
    };
    const state = authReducer(initialState, checkingFinish);
    expect(state).toEqual({
        ...state,
        checking: false,
      });
  });
  test("debe de hacer el logout", () => {
    const logout = {
      type: types.authLogout,
    };
    const state = authReducer(initialState, logout);
    expect(state).toEqual({checking: false});
  });
});
