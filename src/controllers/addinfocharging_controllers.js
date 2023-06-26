const Addinfomodels = require("../models/addinfocharging/add_info_charging_models");
const aws = require("aws-sdk");
const { json } = require("express");
const path = require("path");
const { S3_ENDPOINT, BUCKET_NAME } = process.env;

const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

exports.insertInfoCharging = async (req, res) => {
  try {
    const {
      name,
      imagecpn,
      amount,
      pictureplace,
      constainner,
      province,
      district,
      village,
      nameplace,
      facilities,
      lat_location,
      lng_lacation,
    } = req.body;
    const data = new Addinfomodels({
      name: name,
      imagecpn: imagecpn,
      amount: amount,
      pictureplace: pictureplace,
      province: province,
      district: district,
      village: village,
      nameplace: nameplace,
      lat_location: lat_location,
      lng_lacation: lng_lacation,
    });
    let containerArray = [];
    let facilitiesArray = [];
    if (constainner) {
      for (let index = 0; index < constainner.length; index++) {
        containerArray.push({
          count: `ຕູ້ທີ${index + 1}`,
          brand: constainner[index].brand,
          generation: constainner[index].generation,
          model: constainner[index].model,
          type_charge: constainner[index].type_charge,
        });
      }
      data.constainner = containerArray;
    }

    if (facilities) {
      for (let index = 0; index < facilities.length; index++) {
        facilitiesArray.push({
          facilitie: facilities[index].facilitie,
        });
      }
      data.facilities = facilitiesArray;
    }

    if (!data) {
      res.status(404).json({
        satatus_cod: 404,
        message: "ເກີດຂໍ້ຜິດພາດ",
      });
    }
    await data.save();
    res.status(201).json({
      status_code: 201,
      message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getInfochargAll = async (req, res) => {
  try {
    const data = await Addinfomodels.find();
    if (!data) {
      res.status(404).json({
        satatus_cod: 404,
        message: "ກາລຸນາລອງໃໝ່ອີກຄັ້ງ",
      });
    }
    res.status(200).json({
      data: data.reverse(),
    });
  } catch (error) {}
};
exports.getDatabyId=async(req, res)=>{
  try {
    const{id} = req.params;
    const data = await Addinfomodels.findById({_id:id});
    if (!data) {
      res.status(400).json({
        message:"ບໍ່ມີຂໍ້ມູນນີ້ໃນລະບົບ"
      })
    }
    res.status(200).json({
      data: data
    })
    
  } catch (error) {
    console.log(error)
    
  }
}
exports.deletebyid = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Addinfomodels.findById(id);
    console.log("data", data);
    if (!data) {
      res.status(404).json({
        satatus_cod: 404,
        message: "ບໍ່ມີໄອດີນີ້ໃນລະບົບ",
      });
    } else {
      await data.deleteOne({ _id: id });
      res.status(200).json({ message: "ລົບຂໍ້ມູນໃນລະບົບສຳເລັດແລ້ວ" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      satatus_cod: 500,
      message: "Server error",
    });
  }
};

exports.updateInfochargbyid = async (req, res, next) => {
  try {
    const {
      name,
      imagecpn,
      amount,
      constainner,
      pictureplace,
      province,
      district,
      village,
      nameplace,
      facilities,
      lat_location,
      lng_lacation,
    } = req.body;
    console.log("body:", req.body);
    const { id } = req.params;
    const updatedata = await Addinfomodels.findById(id);
    if (!updatedata) {
      return res.status(404).json({ message: "ບໍ່ມີໄອດີນີ້ໃນລະບົບ" });
    } else {
      const data = await Addinfomodels.findByIdAndUpdate(
        { _id: id },
        {
          name: name,
          imagecpn: imagecpn,
          amount: amount,
          pictureplace: pictureplace,
          province: province,
          district: district,
          village: village,
          nameplace: nameplace,
          lat_location: lat_location,
          lng_lacation: lng_lacation,
        }
      );
      let containerArray = [];
      let facilitiesArray = [];
      if (constainner) {
        for (let index = 0; index < constainner.length; index++) {
          containerArray.push({
            brand: constainner[index].brand,
            generation: constainner[index].generation,
            model: constainner[index].model,
            type_charge: constainner[index].type_charge,
          });
        }
        data.constainner = containerArray;
      }

      if (facilities) {
        for (let index = 0; index < facilities.length; index++) {
          facilitiesArray.push({
            facilitie: facilities[index].facilitie,
          });
        }
        data.facilities = facilitiesArray;
      }

      if (!data) {
        res.status(404).json({ message: "ບໍ່ສາມາດແກ້ໄຂໄດ້ ລອງໃໝ່ອີກຄັ້ງ" });
      }
      res.status(200).json({
        message: "ອັບເດດຂໍ້ມູນສຳເລັດ",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500), json({ message: "Server error" });
  }
};
