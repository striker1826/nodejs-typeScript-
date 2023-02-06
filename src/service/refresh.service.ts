import { signJwt, verifyRefresh } from "../util/jwt-util";

class RefreshService {
  refresh = (refresh_token) => {
    if (typeof refresh_token === "string") {
      const result = verifyRefresh(refresh_token);

      if (typeof result !== "string") {
        if (result === null) throw new Error("유효하지 않은 토큰입니다");
        const { payload } = result;
        const access_token = signJwt({
          id: payload.id,
          userId: payload.userId,
        });
        return {
          access_token: `Bearer ${access_token}`,
        };
      }
    }
  };
}

export default RefreshService;
