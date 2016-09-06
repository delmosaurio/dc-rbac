import test from "tape"
import DcRbac from "../src"

test("dcRbac", (t) => {
  t.plan(1)
  var rb = new DcRbac();
  t.equal(true, (rb instanceof DcRbac) , "Object constructor")
})

test("dcRbac.createUser", (t) => {
  t.plan(1)
  var rb = new DcRbac();
  rb
    .createUser({
      profile_id_profiles: 1,
      username: 'delmosaurio',
      email: 'delmosaurio@gmail.com',
      password: '653241'
    })
    .then((user)=>{
      //console.log(user)
      t.equal(true, (typeof user === 'object') , "User created")
    });
})

