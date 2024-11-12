const { default: nodemon } = require('nodemon');
const connect_obj = require('../Database/myconnector');
const connection = require('../Database/myconnector');
class India{
    Add_Record(req, res){
        if(req.method == 'GET'){
            res.render('record');
            res.end();
        }
        else{
            connect_obj.getConnection((err,connection) => {
                if(err){
                    res.send(err);
                    res.end();
                }
                else{
                    const q = `INSERT INTO Human(name, Aadharcard, address) VALUES ('${req.body.name}', '${req.body.adhr}', '${req.body.address}')`;
                    connection.query(q, (err) => {
                        if(err){
                            res.send(err);
                            res.end();
                        }
                        else{
                            res.render('record', {message: req.body.name + " Record Added Successfully"});
                            res.end();
                        }
                    });
                }
            })
        }
    }


    Fetch_AllRecord1(req, res){
        
            connect_obj.getConnection((err, connection) => {
                if(err){
                    res.send(err);
                    res.end();
                }
                else{
                    const q = `SELECT * FROM human`;
                    connection.query(q, (err, data) => {
                        if(err){
                            res.send(err);
                            res.end();
                        }
                        else{
                            res.render('display1', {record : data});
                            res.end();
                        }
                    });
                }
            })
        
    }

    Fetch_AllRecord2(req, res){
        
        connect_obj.getConnection((err, connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                const q = `SELECT * FROM human`;
                connection.query(q, (err, data) => {
                    if(err){
                        res.send(err);
                        res.end();
                    }
                    else{
                        res.render('display2', {record : data});
                        res.end();
                    }
                });
            }
        })   
}

Fetch_AllRecord3(req, res){
    connect_obj.getConnection((err, connection) => {
        if(err){
            res.send(err);
            res.end();
        }
        else{
            const q = `SELECT * FROM human`;
            connection.query(q, (err, data) => {
                if(err){
                    res.send(err);
                    res.end();
                }
                else{
                    res.render('display3', {record : data});
                    res.end();
                }
            });
        }
    })
}

Delete_Record1(req, res){
    connect_obj.getConnection((err, connection) => {
        if(err){
            res.send(err);
            res.end();
        }
        else{
            let human_id = req.query.hm_id;
            const q = `delete from human where id = '${human_id}'`;
            connection.query(q, (err) => {
                if(err){
                    res.send(err);
                    res.end();

                }
                else{
                    this.Fetch_AllRecord2(req, res);
                }
            })
        }
    })
}

Delete_Record2(req, res){
    connect_obj.getConnection((err, connection) => {
        if(err){
            res.send(err);
            res.end();
        }
        else{
            let human_id = req.query.hm_id;
            const q = `delete from human where id = '${human_id}'`;
            connection.query(q, (err) => {
                if(err){
                    res.send(err);
                    res.end();

                }
                else{
                    this.Fetch_AllRecord3(req, res);
                }
            })
        }
    })
}
Update_Record1(req, res){
    connect_obj.getConnection((err, connection) => {
        if(err){
            res.send(err);
            res.end();
        }
        else{
            // let human_id = req.query.hm_id;
            const q = `UPDATE human SET name = '${req.body.name}', aadharcard = '${req.body.aadharcard}', address = '${req.body.address}' WHERE id = '${req.body.id}'`;
            connection.query(q, (err) => {
                if(err){
                    res.send(err);
                    res.end();
                }
                else{
                    this.Fetch_AllRecord3(req, res);
                }
            })
        }
    })
}

Search_Record(req, res){
    if(req.method == 'GET'){
        res.render('search');
        res.end();
    }
    else{
        connect_obj.getConnection((err, connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                const q = `select * from human where name = '${req.body.name}'`;
                connection.query(q, (err, data) => {
                    if(err){
                        res.send(err);
                        res.end();
                    }
                    else{
                        if(data.length > 0){
                            res.render('search', {record : data});
                            res.end();
                        }
                        else{
                            res.render('search', {message: "Record Not Found"});
                            res.end();
                        }
                    }
                })
            }
        })
    }
}

Update_Record_temp(req, res){
    if(req.method == 'GET'){
        res.render('record');
        res.end();
    }
    else{
        connect_obj.getConnection((err,connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                // const q = `UPDATE human SET name = '${req.body.name}', aadharcard = '${req.body.aadharcard}', '${req.body.address}' WHERE id = '${req.body.id}'`;
                const q = `UPDATE human SET name = ?, aadharcard = ?, address = ? WHERE id = ?`;
                const { name, aadharcard, address, id } = req.body;
                connection.query(q, [name, aadharcard, address, id], (err) => {
                    if(err){
                        res.send(err);
                        res.end();
                    }
                    else{
                        this.Fetch_AllRecord3(req, res);
                    }
                });
            }
        })
    }
}

// Delete_Show_Record1(req, res){
//     if(req.method == 'GET'){
//         res.render('delete_show');
//         res.end();
//     }
//     else{
//         connect_obj.getConnection((err, connection) => {
//             if(err){
//                 res.send(err);
//                 res.end();
//             }
//             else{
//                 const q = `select * from human where name = '${req.body.name}'`;
//                 connection.query(q, (data, err) => {
//                     if(err){
//                         res.send(err);
//                         res.end();
//                     }
//                     else{
//                         if(data.length > 0){
//                             const k = `DELETE FROM human where name = '${req.body.name}'`;
//                             connection.query(k, (err) => {
//                                 if(err){
//                                     res.send(err);
//                                     res.end();
//                                 }
//                                 else{
//                                     const r = `SELECT * FROM human`;
//                                     connection.query(r, (err, data1) => {
//                                         if(err){
//                                             res.send(err);
//                                             res.end();
//                                         }
//                                         else{
//                                             res.render('delete_show', {record : data1});
//                                             res.end();
//                                         }
//                                     })
//                                 }
//                             })
//                         }
//                         else{
//                             res.render('delete_show', {message : "No Such Record Found"});
//                             res.end();
//                         }
//                     }
//                 })
//             }
//         })
//     }
// }


// Delete_Show_Record2(req, res) {
//     if (req.method === 'GET') {
//         res.render('delete_show');
//     } else {
//         connect_obj.getConnection((err, connection) => {
//             if (err) {
//                 console.error('Database connection error:', err);
//                 res.send(err);
//                 return;
//             }
            
//             // Query to find the record
//             const findQuery = `SELECT * FROM human WHERE name = '${req.body.name}'`;
//             connection.query(findQuery, (err, data) => {
//                 if (err) {
//                     console.error('Query error:', err);
//                     res.send(err);
//                     return;
//                 }
                
//                 if (data.length > 0) {
//                     // Delete the record
//                     const deleteQuery = `DELETE FROM human WHERE name = '${req.body.name}'`;
//                     connection.query(deleteQuery, (err) => {
//                         if (err) {
//                             console.error('Delete error:', err);
//                             res.send(err);
//                             return;
//                         }
                        
//                         // Query to get the updated records
//                         const selectQuery = `SELECT * FROM human`;
//                         connection.query(selectQuery, (err, updatedData) => {
//                             if (err) {
//                                 console.error('Select error:', err);
//                                 res.send(err);
//                                 return;
//                             }
                            
//                             res.render('delete_show', { record: updatedData });
//                         });
//                     });
//                 } else {
//                     res.render('delete_show', { message: "No Such Record Found" });
//                 }
//             });
//         });
//     }
// }


Delete_Show_Record(req, res){
    if(req.method == 'GET'){
        res.render('delete_show');
        res.end();
    }
    else{
        connect_obj.getConnection((err, connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                const find = `SELECT * FROM human WHERE name = '${req.body.name}'`;
                connection.query(find,(err, find_data) => {
                    if(err){
                        res.send(err);
                        res.end();
                    }
                    else{
                        if(find_data.length > 0){
                            const deleteQuery = `DELETE FROM human WHERE name = '${req.body.name}'`;
                            connection.query(deleteQuery, (err) => {
                                if(err){
                                    res.send(err);
                                    res.end();
                                }
                                else{
                                    const fetch = 'SELECT * FROM human';
                                    connection.query(fetch, (err, fetch_data) => {
                                        if(err){
                                            res.send(err);
                                            res.end();
                                        }
                                        else{
                                            res.render('delete_show', {record : fetch_data});
                                        }
                                    })
                                }
                            })
                        }
                        else{
                            res.render('delete_show', {message : "No Such Record Found"});
                        }
                    }
                })
            }
        })
    }
}

Count(req, res){
    if(req.method == 'GET'){
        res.render('count');
        res.end();
    }
    else{
        connect_obj.getConnection((err, connection) => {
            const count = `Select count(*) as count from ${req.body.name}`;
            connection.query(count,(err, data) =>{
                if(err){
                    res.send(err);
                    res.end();
                }
                else{
                    // console.log(data);
                    res.render('count', {count : data[0].count});
                    res.end();
                }
            })
        })
    }
    // connect_obj.getConnection((err, connection) => {
    //     const count = `SELECT COUNT(*) as a count FROM '${req.body.name}'`;
    //     connection.query(count,(err, data) => {
    //         if(err){
    //             res.send(err);
    //             res.end();
    //         }
    //         else{
                
    //         }
    //     })
    // })
}



Login_Check(req, res){
    if(req.method == 'GET'){
        res.render('login');
        res.end();
    }
    else{
        connect_obj.getConnection((err, connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                const q = `select * from user where email = '${req.body.email}' and password = '${req.body.password}'`;
                connection.query(q, (err, data) => {
                    if(err){
                        res.send(err);
                        res.end();
                    }
                    else{
                        if(data.length > 0){
                            req.session.myemailid = req.body.email;
                            res.redirect('/Welcome_dashboard');
                        }
                        else{
                            res.render('login', {message : "Invalid Credentials"});
                            res.end();
                        }
                    }
                })
            }
        })
    }
}

SignUp_User(req, res){
    if(req.method == 'GET'){
        res.render('signup');
        res.end();
    }
    else{
        connect_obj.getConnection((err, connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                const q = `insert into user(name, email, password, gender, mobile, address) values
                ('${req.body.name}', '${req.body.email}', '${req.body.password}', '${req.body.gender}', '${req.body.mobile}', '${req.body.address}')`;

                connection.query(q, (err) => {
                    if(err){
                        res.send(err);
                        res.end();
                    }
                    else{
                        res.render('signup', {message : req.body.name + "Signup Successfully"});
                        res.end();
                    }
                })
            }
        })
    }
}


change_pass(req, res){
    if(req.method == 'GET'){
        res.render('changepassword');
        res.end();
    }
    else{
        connect_obj.getConnection((err, connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                const q = `select * from user where email = '${req.session.myemailid}' and password = '${req.body.oldpass}'`;
               connection.query(q, (err, data) => {
                if(err){
                    res.send(err);
                    res.end();
                }
                else{
                    if(data.length > 0){
                        if(req.body.newpass == req.body.confpass){
                            const r = `update user set password = '${req.body.newpass}' where email = '${req.session.myemailid}'`;
                            connection.query(r, (err) => {
                                if(err){
                                    res.send(err);
                                    res.end();
                                }
                                else{
                                    res.render('changepassword', {message : "Record Changed Successfully", message2 : "Relogin ?"});
                                    res.end();
                                }
                            })
                        }
                        else{
                            res.render('changepassword', {message : "New and Confirm password mismatch"});
                            res.end();
                        }
                    }
                    else{
                        res.render('changepassword', {message : "Old Password incorrect"});
                        res.end();
                    }
                }
               })
            }
        })
    }
}

}






const obj1 = new India();

module.exports = obj1;