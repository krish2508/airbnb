const singupPage=(req, res) => {
    res.render("auth/signup.ejs");
};
const loginPage=(req, res) => {
    res.render("auth/login.ejs");
};
const createUser=async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    console.time("hash");
    const hashedPassword= await bcrypt.hash(data.password,10);
    console.timeEnd("hash");
    // console.log(hashedPassword);
    const newuser = await LogInCollection.create({ name: data.name, email: data.email, password: hashedPassword });
    if (!newuser) {
        return res.status(401).send("Problem in creating user");
    }

    res.status(201).render("auth/login.ejs");
};
const loginUser=async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });
        if (!check){
            return res.status(401).send("user not found");
        }
        let pass=req.body.password;
        const Validuser=await bcrypt.compare(pass,check.password);
        if (!Validuser) {
            return res.status(401).send('not a valid user incorrect password');
        }
        
        return res.status(201).redirect("/listings");
    } catch (e) {
        res.status(401).send("wrong details");
    }
};
module.exports={singupPage,loginPage,createUser,loginUser};