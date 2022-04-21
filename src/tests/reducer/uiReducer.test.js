import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialState = {
  modalOpen: false,
};
describe("Pruebas en uiReducer", () => {
  test("debe de retornar su estado por defecto", () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  test("debe abrir y cerrar el modal", () => {
    const modalOpen = uiOpenModal();
    const stateOpen = uiReducer(initialState, modalOpen);
    expect(stateOpen.modalOpen).toBe(true);
    
    const modalClose = uiCloseModal();
    const stateClose = uiReducer(initialState, modalClose);
    expect(stateClose.modalOpen).toBe(false);
  });
});
