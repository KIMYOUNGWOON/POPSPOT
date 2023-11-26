const { Waiting, PopupStore, User } = require("../models");
// const mongoose = require("mongoose");

class WaitingService {
  async createWaiting(popup, people, email) {
    const popup_waiting = await Waiting.find({
      popup_store: popup,
      is_enter: false,
    }).sort({ createdAt: 1 });

    const beforeMe = popup_waiting.length;
    const user = await User.findOne({ email }).select("_id");

    const newWaitingData = {
      date: new Date(),
      people,
      popup_store: popup,
      user: user._id,
    };
    const newWaiting = await Waiting.create(newWaitingData); // 새로운 웨이팅 정보 만듬

    if (!newWaitingData) {
      throw new Error("웨이팅 접수 실패");
    }

    return beforeMe;
  }

  // 현장대기 현황 조회
  async getWaitingStatus(email) {
    const user = await User.findOne({ email }).select("_id");
    // console.log("여기11", user);

    const waiting = await Waiting.find({ user, is_enter: false }).select(
      "popup_store"
    );
    // console.log("여기22", waiting);

    let result = [];
    if (waiting.length !== 0) {
      for (let v of waiting) {
        const popup = v.popup_store;
        console.log("여기11", popup);
        const popup_info = await PopupStore.findOne({ _id: popup }).select(
          "name"
        );
        console.log("여기22", popup_info);

        const popup_waiting = await Waiting.find({
          popup_store: popup,
          is_enter: false,
        }).sort({ createdAt: 1 });

        let idx;
        for (let i = 0; i < popup_waiting.length; i++) {
          if (popup_waiting[i].user.toString() === user._id.toString()) {
            idx = i;
          }
        }

        result.push([popup_info.name, idx]); // [대기 걸어둔 팝업스토어 이름, 내 앞에 몇명인지]
      }
      // console.log("여기33", result);
      return result;
    }
  }

  // 업체 관리자 페이지에서
  // 특정 팝업 스토어 Id에 대한 웨이팅 리스트를 조회할 수 있다.
  async getWaitingByPopupStore(popup) {
    const waitingByPopupStore = await Waiting.find({
      popup_store: popup,
      is_enter: false,
    })
      .sort({ createdAt: 1 })
      .populate("user");

    if (!waitingByPopupStore) {
      throw new Error("팝업스토어 현장대기 조회를 실패했습니다.");
    }

    return waitingByPopupStore;
  }

  async validateAdmin(email, popupStoreId) {
    const isAdminUser = await User.findOne({ email }).select("admin_corp");
    console.log("isAdminUser: ", isAdminUser);
    console.log("popupStoreId: ", popupStoreId);

    if (
      isAdminUser.admin_corp === popupStoreId &&
      isAdminUser.admin_corp !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  async enterCheck(popupStoreId, userId) {
    const waitingList = await Waiting.findOneAndUpdate(
      {
        popup_store: popupStoreId,
        is_enter: true,
        user: userId,
      },
      { is_enter: false }
    );
  }
}

module.exports = WaitingService;
