import test from "tape"
import dcRbac from "../src"

test("dcRbac", (t) => {
  t.plan(1)
  t.equal(true, dcRbac(), "return true")
})
