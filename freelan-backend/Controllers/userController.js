 const userModel = require("../Model/UserModel")
 const bcrypt = require("bcrypt")
 const jwt = require("jsonwebtoken")
 
 const SignUp = async (req, res)=>{
    const {FirstName,LastName,Email,Password} = req.body
    if (!FirstName||!LastName||!Email||!Password) {
        res.status(400).send({message : "All Fields are mandatory"});
    } else {

        
        try {
            const validateUser = await userModel.findOne({Email})

            if (validateUser) {
                res.status(400).send({ message: "User Already Exists" });  
            }else{
                const hashPassword = await bcrypt.hash(Password,10)

                const createUser = await userModel.create({
                    FirstName,
                    LastName,
                    Email,
                    Password:hashPassword
                })
    
                if (createUser) {
                    res.status(200).send({
                        message: `Account Created Successfully for ${createUser.FullName}`,
                        status: "success",
                      });
                } else {
                    res.status(400).send({message:"Unable to create user's account"});
                }
            }

          
        } catch (error) {
            res.status(500).send({message:"Internal Server Error"});
          }
        }
    }

    const Login = async (req,res) =>{
        const {Email,Password} = req.body
        if (!Email || !Password) {
            res.status(400).send({ message: "All Fields Are Mandatory" });
        } else {
            try {
                
                const validateUser = await userModel.findOne({Email})
                if (!validateUser) {
                    res.status(400).send({
                        message: "Account Does Not Exist, Try Creating one!",
                        status: false,
                      });
                } else {
                    const comparedPassword = await bcrypt.compare(Password,validateUser.Password)
                    const secretKey = process.env.SECRET_KEY;
                    
                    const generateToken = await jwt.sign(
                        {
                            user:{
                                FirstName:validateUser.FirstName,
                                Email:validateUser.Email
                            },
                            
                        },
                        secretKey,
                        {expiresIn:"1d"}
                    )
                    if (comparedPassword) {
                        res.status(200).send({
                            message: `Welcome  ${validateUser.FullName}`,
                            generateToken,
                            status: "success",
                          }); 
                    }
                }
            } catch (error) {
                console.error("Error updating account:", error);
    return res.status(500).send({ message: "Error updating account" });
            }
        }
    }
 

    module.exports = {SignUp , Login}