import facebookIcon from "../assets/facebook.svg";
import githubIcon from "../assets/github.svg";
import youtubeIcon from "../assets/youtube.svg";

const Social = () => {
  return (
    <div className="flex items-center">
      <a
        target="_blank"
        href="https://www.youtube.com/@99DNAM"
        className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
      >
        <img className="w-6 h-6" src={youtubeIcon} alt="youtube icon" />
      </a>
      <a
        target="_blank"
        href="https://www.facebook.com/profile.php?id=100065113560411"
        className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
      >
        <img className="w-6 h-6" src={facebookIcon} alt="youtube icon" />
      </a>
      <a
        target="_blank"
        href="https://github.com/99DVN"
        className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
      >
        <img className="w-6 h-6" src={githubIcon} alt="youtube icon" />
      </a>
    </div>
  );
};

export default Social;
