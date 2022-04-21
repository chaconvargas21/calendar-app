import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe("Pruebas en fecth", () => {
  let token = "";
  test("fecthSinToken debe funcionar", async () => {
    const res = await fetchSinToken(
      "auth",
      { email: "juan@gmail.com", password: "123456" },
      "POST"
    );
    expect(res instanceof Response).toBe(true);

    const body = await res.json();

    expect(body.ok).toBe(true);

    token = body.token;
  });

  test("fecthConToken debe funcionar", async () => {
    localStorage.setItem("token", token);
    const resp = await fetchConToken(
      "events/625eddf0ec62e81a680f628b",
      {},
      "DELETE"
    );
    const body = await resp.json();
    expect(body).toEqual({
      ok: false,
      msg: "No se encontro evento con ese id",
    });
  });
});
