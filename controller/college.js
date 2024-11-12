const connection = require('../Database/myconnector');
const connect_obj = require('../Database/myconnector');
class College{
    Add_Student(req, res){
        if(req.method == 'GET'){
            res.render('student');
            res.end();
        }
        else{
            connect_obj.getConnection((err, connection) => {
                if(err){
                    res.send(err);
                    res.end();
                }
                else{
                    const q = `INSERT INTO STUDENT(name, roll, photo) VALUES ('${req.body.name}','${req.body.roll}','${req.file.path}')`;
                    connection.query(q, (err) => {
                        if(err){
                            res.send(err);
                            res.end();
                        }
                        else{
                            res.render('student', {message : req.body.name + 'Record Saved Successfully'});
                            res.end();
                        }
                    })
                }
            })
        }
    }

    Display_Student_Record1(req, res){
        connect_obj.getConnection((err, connection) => {
            if(err){
                res.send(err);
                res.end();
            }
            else{
                const q = `SELECT * FROM student`;
                connection.query(q, (err, data) => {
                    if(err){
                        res.send(err);
                        res.end();
                    }
                    else{
                        res.render('display_student', {record : data});
                        res.end();
                    }
                })
            }
        })
    }
}



const stu_obj1 = new College();
module.exports = stu_obj1;