import bcrypt from 'bcrypt-nodejs'; 

export const genPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(password));
export const validPassword = (password, hash) => bcrypt.compareSync(password, hash);






//  var token = await key.encrypt(user.password, 'base64');     //use old password as base to encription
                    //   var token = jwt.sign({ username: user.username }, privateKey, { algorithm: 'RS256'});

                    //  const key = new NodeRSA({ b: 512 });
                    //  var publicKey  = key.exportKey('public');
                    //  var privateKey = key.exportKey('private');
