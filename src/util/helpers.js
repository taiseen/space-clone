import { debounce as LDebounch } from "lodash";

export const debounce = (func, delay) => {
  return LDebounch(func, delay || 300);
};

export const sliceText = (text, sliceNumber = 14) => {
  if (!text) return null;
  if (text.length < sliceNumber) return text;
  return text?.slice(0, sliceNumber) + "...";
};

export const toFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    value && formData.append(key, value);
  });
  return formData;
};

export const getBase64Image = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const parseError = (error) => {
  if (error?.issue?.message) {
    return error?.issue?.message;
  } else {
    return Object.values(error?.issue)[0];
  }
};

export const sortByAlphabet = (data, sortKey) => {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const sortedData = {};
  alphabets.split("").forEach((alphabet) => {
    const sortData = data.filter((item) =>
      sortKey(item).toLowerCase().startsWith(alphabet)
    );
    if (sortData.length) {
      sortedData[alphabet] = sortData;
    }
  });
  return sortedData;
};

const splitSpecificParts = (str, startChar, endChar) => {
  const targetParts = [];
  const splitWithStartChar = str.split(startChar);

  for (let arrItem of splitWithStartChar) {
    if (arrItem.indexOf(endChar) > -1) {
      const splitEndIndex = arrItem.indexOf(endChar);
      const item = arrItem.substring(0, splitEndIndex);
      targetParts.push(item);
    }
  }

  return targetParts;
};

export const populateUsers = (content) => {
  let target = String(content.text);

  if (target === "undefined") {
    return undefined;
  }

  let replaceArray = splitSpecificParts(target, "{{", "}}");

  for (var i = 0; i < content.mentionedUsers.length; i++) {
    target = target.replace(
      new RegExp("{{" + replaceArray[i] + "}}", "gi"),
      `<b style="color: #1b9ed6;">${content.mentionedUsers[i].fullName}</b>`
    );
  }

  return target;
};

export const requestNotificationPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      // create init notification
    });
  }
};

export const sentLocalNotification = (msg) => {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(msg);

    notification.onclick = function () {
      window.open("https://space.makereal.click/projects");
    };

    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(msg);

        notification.onclick = function () {
          window.open("https://space.makereal.click/projects");
        };
      }
    });
  }
};
