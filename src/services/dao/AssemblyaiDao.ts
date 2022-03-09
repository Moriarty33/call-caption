import axios from "axios";
import { audioOptions } from "../../constants/audioOptions";

export class AssemblyaiDao {
  static apiKey = "be7cb5770ef14801916d8183acc649f6";

  static async startSocket() {
    const { data } = await axios.post(
      "https://api.assemblyai.com/v2/realtime/token",
      { expires_in: 3600 },
      { headers: { authorization: AssemblyaiDao.apiKey } }
    );

    return new WebSocket(
      `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=${audioOptions.sampleRate}&token=${data.token}`
    );
  }
}
