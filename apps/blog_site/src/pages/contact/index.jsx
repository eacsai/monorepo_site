import { memo } from "react";
import { ContactStyle } from "./style";
export default memo(function Contact() {
  return (
    <ContactStyle>
      <div class="image" style={{backgroundImage: "url('https://tva1.sinaimg.cn/large/008i3skNly1gtksrubuxkj61gs0u0wi702.jpg')"}}></div>
      <div class="heading">
        <h1>When you are confused</h1>
      </div>
      <div class="text">
        <h1>Set goals in your mind</h1>
      </div>
      <div class="image" style={{backgroundImage: "url('https://tva1.sinaimg.cn/large/008i3skNly1gtr005wg7xj61c00u0wm702.jpg')"}}></div>
      <div class="heading">
        <h1>When you're down</h1>
      </div>
      <div class="text">
        <h1>Try to wake up the beast in your heart</h1>
      </div>

      <div class="image" style={{backgroundImage: "url('https://tva1.sinaimg.cn/large/008i3skNly1gtr00fsd10j61a90u0dmk02.jpg')"}}></div>
      <div class="heading">
        <h1>When prople leave you</h1>
      </div>
      <div class="text">
        <h1>It's time to start your season</h1>
      </div>

      <div class="image" style={{backgroundImage: "url('https://tva1.sinaimg.cn/large/008i3skNly1gtr00uv7d4j32080u07n8.jpg')"}}></div>
      <div class="heading">
        <h1>Come on,stranger.</h1>
      </div>
    </ContactStyle>
  );
});
