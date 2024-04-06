import React from "react";
import { Box, Divider, Text, Flex, ScrollView } from "native-base";

import { Image } from "react-native";
const myImageHeart = require("../../assets/images/isn.png");
const myImageTemp = require("../../assets/images/temp.png");
const myImagedogGif = require("../../assets/images/dogGif2.gif");
const myImagesickDog = require("../../assets/images/sickDog.png");
import { ref, onValue } from "firebase/database";
import { db } from "../../firebaseConfig.js";
import QRCode from "react-native-qrcode-svg";
import QRForm from "./QRForm";
import { relative } from "path";

export default function MainUi() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const sref = ref(db, "DHT/");
    onValue(sref, (snapshot) => {
      const dat = snapshot.val();
      setData(dat);
    });
  }, []);
  return (
    <ScrollView >
      <Flex h="100%" mt="50px" alignItems="center" pt="10">
        <Flex direction="row" justifyContent="center">
          <Box
            borderRadius="full"
            shadow={6}
            pt="20px"
            alignItems="center"
            mr="30px"
            h="150px"
            w="150px"
            bg="white"
          >
            <Image source={myImageHeart} style={{ width: 40, height: 40 }} />
            <Box
              pt="5px"
              _text={{
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              {data && data.heartRate}
            </Box>
            <Text>bpm</Text>
          </Box>
          <Box
            borderRadius="full"
            shadow={6}
            justifyContent="center"
            alignItems="center"
            // mr="30px"
            h="150px"
            w="150px"
            bg="white"
            _text={{
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            <Image source={myImageTemp} style={{ width: 60, height: 60 }} />
            <Text
              fontSize="30px"
              fontWeight="700"
              color={data?.temperature >= 106 ? "red.600" : "black"}
            >
              {data && data.temperature}°F
            </Text>
          </Box>
        </Flex>
        <Flex direction="row" justifyContent="center" mb="30px" w="90%">
          <Box
            borderRadius="2xl"
            shadow={6}
            justifyContent="center"
            alignItems="center"
            // mr="30px"
            h="150px"
            w="full"
            mt="30px"
            bg="white"
            _text={{
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            {data && data.water == "1"
              ? "Safe from water"
              : "Might Fell in water"}
          </Box>
        </Flex>
        <Box mt="45px">
          <Image source={data&& data.temperature>=106 || data.heartRate>=160?myImagesickDog:myImagedogGif} style={{ width: 160, height: 160 }}/>
        </Box>
        {/* <Box mt="30px" mb="30px">
        <Button
          bg="gray.100"
          borderRadius="sm"
          size="sm"
          shadow={6}
          _text={{
            color: "black",
            fontSize: "16px",
          }}
        >
          Create QR
        </Button> 
       </Box> */}
        {/* <Flex h="50px" w="90%"
          pl="10px" mt="20px"
          justifyContent="center">
          <Text fontSize="2xl">
            Create a Collar QR for your pet

          </Text>
        </Flex> */}
        {/* <Divider px="2" w="90%" />
        <QRForm />
        <QRCode value="Mobile no: 984654211, address:9-113 jkg kjgjhg , pet name: snoopy" /> */}
      </Flex> 
    </ScrollView>
  );
}
