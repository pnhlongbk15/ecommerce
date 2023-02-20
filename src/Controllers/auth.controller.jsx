import { authApi } from "~/API/authApi"
import { initial, notify } from "~/Redux/Slice/authSlice";

export const profileController = {
        async handleUpdateProfile(profile, cb) {
                const { status, message } = await authApi.updateProfile(profile);
                if (status === 'error') {
                        cb(message, null)
                        return;
                }
                cb(null, message)
        },
        async handleUpdateAvatar(file, emit) {
                const response = await authApi.updateAvatar({ avatar: file });
                // if (status === 'error') {
                //         cb(message, null)
                //         return false;
                // }
                emit(notify(response))

                // cb(null, message)
                // return true
        },
        async handleResetAvatar(emit) {
                const { image } = await authApi.avatar()
                localStorage.setItem('avatar', image)
                emit(initial())
        }
}