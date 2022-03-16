import {
  visible,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  TextInput,
  text,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Dialog from "react-native-dialog";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const api = "http://192.168.43.153:3002/"; // local 192.168.43.70 , là lấy ở phần setting của thông tin wifi .
  const [data, setData] = useState([]); //data đang là mảng rỗng =)) Vì trong database có nhiều mảng nên để rỗng thôi , Phần này với phần bên dưới là 1 cặp
  const [pagenumber, setpagenumber] = useState(1); // set number là 1 :> Vì lúc đầu vào giao diện , mình sẽ load trang 1 nên để mặc định là 1
  const onPressLearnMore = (getpage) => {
    // code cho button chuyen trang
    setpagenumber(getpage);
    getData();
  };

  const [isLoading, setLoading] = useState(false); // Dòng này là dành cho phần dialog (lúc bấm vào thêm sản phẩm sẽ có)
  //Thêm Sản Phẩm code
  const [tenconst, settenconst] = useState(""); // Gọi tên sản phẩm khi show dialog
  const [loaiconst, setloaiconst] = useState(""); // Gọi Loại sản phẩm khi show dialog
  //code add product
  const addThuonghieu = () => {
    fetch(api + "addthuonghieu/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   mytasksname: tenconst,
      //   mydes: loaiconst,
      // }),
    }).then((response) => {
      if (response == "ok") {
        alert("thêm thành công");
      }
    });
    //Dòng tắt dialog
    setLoading(false);
  };
  //Phầm btn show dialog sản phẩm
  const showDialog = () => {
    // setLoading(true);
  };
  //phần thoát trong Dialog sản phẩm
  const handleCancel = () => {
    setLoading(false);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const [showdelete, setshowdelete] = useState(false); // Dòng này là dành cho phần dialog (lúc bấm vào xóa sản phẩm sẽ có)
  //Xóa Sản Phẩm code
  const [IdXoa, setIdXoa] = useState(""); //Gọi mã Id để xóa
  const deletetasksnew = () => {
    fetch(api + "deletethuonghieu/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myid: IdXoa,
      }),
    }).then((response) => {
      if (response == "okdelete") {
        alert("xóa thành công");
      }
    });
    //Dòng tắt dialog
    setshowdelete(false);
  };

  //Phầm btn show dialog sản phẩm
  const showDialogXoa = () => {
    setshowdelete(true);
  };
  //phần thoát trong Dialog sản phẩm
  const shoDialogThoatXoa = () => {
    setshowdelete(false);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////
  const [showedit, setshowedit] = useState(false); // Dòng này là dành cho phần dialog (lúc bấm vào sửa sản phẩm sẽ có)
  //Sửa Sản Phẩm
  const edittasksnew = () => {
    fetch(api + "updatethuonghieu/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   editname: tenconst,
      //   editdes: loaiconst,
      //   editid: IdXoa,
      // }),
    }).then((response) => {
      if (response == "okedit") {
        alert("xóa thành công");
      }
    });
    //Dòng tắt dialog
    setshowedit(false);
  };

  //Phầm btn show dialog sản phẩm
  const showDialogSua = () => {
    setshowedit(true);
  };
  //phần thoát trong Dialog sản phẩm
  const showDialogSuaThoat = () => {
    setshowedit(false);
  };
  //////////////////////////////////////////////////////////////
  // code gọi phân trang
  const getData = async () => {
    try {
      const response = await fetch(api + "thuonghieu");
      const json = await response.json();
      // setData(json.movies);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  ////////////////////////////////////////////////////////////////
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* List Danh Sách Và Sửa*/}

      <View style={{ flex: 1, padding: 10 }}>
        {isLoading || showdelete || showedit ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            // numColumns={2}
            style={styles.flatList}
            data={data}
            keyExtractor={({ id }, index) => id} //Mỗi item trong flatList sẽ yêu cầu 1 key :> key đó là key id (giống như khóa chính)
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Text style={styles.listItem} onPress={() => showDialogSua()}>
                  {" "}
                  <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                    {" "}
                    {item.mathuonghieu}{" "}
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {" "}
                    {item.diachi}
                  </Text>
                  <Text>{item.tenthuonghieu}</Text>
                  <Text> {item.email} </Text>
                </Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => showDialog()}>
            <Image
              style={{ width: 50, height: 50, justifyContent: "flex-end" }}
              source={{
                uri: "https://cdn-icons.flaticon.com/png/512/5948/premium/5948991.png?token=exp=1645848496~hmac=2ef6cbdb4f655d4823bb703ab7452002",
              }}
            />
          </TouchableOpacity>

          <Dialog.Container
            visible={isLoading}
            onRequestClose={() => {
              Alert.alert("Lỗi ! Bạn đã bấm vào trở về.");
              setLoading(false);
            }}
          >
            <Dialog.Title>Thêm</Dialog.Title>
            <Dialog.Input
              placeholder="Tên ghi chú"
              value={tenconst}
              onChangeText={settenconst}
              keyboardType="default"
            ></Dialog.Input>
            <Dialog.Input
              placeholder="Nội dung việc cần làm"
              value={loaiconst}
              onChangeText={setloaiconst}
            ></Dialog.Input>
            <Dialog.Button label="Thoát" onPress={handleCancel} />
            <Dialog.Button label="Thêm" onPress={addThuonghieu} />
          </Dialog.Container>
        </View>

        {/* Xóa Sản Phẩm */}
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => showDialogXoa()}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: "https://cdn-icons.flaticon.com/png/512/5676/premium/5676146.png?token=exp=1645848231~hmac=aa5d75704d3e2c93b86e9e2d7482d8fb",
              }}
            />
          </TouchableOpacity>

          <Dialog.Container
            visible={showdelete}
            onRequestClose={() => {
              Alert.alert("Lỗi ! Bạn đã bấm vào trở về.");
              setshowdelete(true);
            }}
          >
            <Dialog.Title>Nhập ID cần xóa</Dialog.Title>
            <Dialog.Input
              placeholder="ID"
              value={IdXoa}
              onChangeText={setIdXoa}
              keyboardType="number-pad"
            ></Dialog.Input>
            <Dialog.Button label="Thoát" onPress={shoDialogThoatXoa} />
            <Dialog.Button label="Xóa" onPress={deletetasksnew} />
          </Dialog.Container>
        </View>
      </View>

      {/* Sủa Sản Phẩm */}
      <View>
        <Dialog.Container
          visible={showedit}
          onRequestClose={() => {
            Alert.alert("Lỗi ! Bạn đã bấm vào trở về.");
            setshowedit(false);
          }}
        >
          <Dialog.Title>Sửa </Dialog.Title>
          <Dialog.Input
            placeholder=" ID "
            value={IdXoa}
            onChangeText={setIdXoa}
            keyboardType="number-pad"
          ></Dialog.Input>
          <Dialog.Input
            placeholder="Sửa Tên"
            value={tenconst}
            onChangeText={settenconst}
            keyboardType="default"
          ></Dialog.Input>
          <Dialog.Input
            placeholder="Sửa nội dung"
            value={loaiconst}
            onChangeText={setloaiconst}
          ></Dialog.Input>
          <Dialog.Button label="Thoát" onPress={showDialogSuaThoat} />
          <Dialog.Button label="Sửa" onPress={edittasksnew} />
        </Dialog.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    padding: 20,
    marginVertical: 5,
    borderRadius: 20,
    color: "#000",
    backgroundColor: "#ffff",
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowOpacity: 2.5,
    shadowRadius: 5,
    elevation: 5,
    width: 410,
    height: 120,
  },
  page: {
    borderRadius: 100,
  },
});
