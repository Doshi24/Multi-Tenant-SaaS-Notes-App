import { toast } from "react-toastify";

export default function showToast(type, message) {
switch (type) {
    case "success":
      toast.success(message, { autoClose: 5000 });
      break;
    case "error":
      toast.error(message, { autoClose: 10000 });
      break;
    case "warn":
      toast.warn(message, { autoClose: 4500 });
      break;
    default:
      toast.info(message, { autoClose: 4500 });
      break;
  }
};
