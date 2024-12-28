import {Blood} from '../models/Blood.model.js'

export const getBlood = async (req, res) => {
	res.send("hello world")
};


export const addDonor = async(req,res)=>{
    const {name,bloodGroup,disease,NumberofTimesDonated} = req.body;
    const newDonor = new Blood({
        name,
        bloodGroup,
        disease,
        NumberofTimesDonated
    });
    newDonor.save()
    .then(()=>{
        res.status(200).json("Donor added successfully")
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
}

export const showDonor = async(req,res)=>{
    Blood.find()
    .then((donor)=>{
        res.status(200).json(donor)
    })
    .catch((err)=>{
        res.status(400).json
    }
    )
}