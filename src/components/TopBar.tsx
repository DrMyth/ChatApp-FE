import { ChatIcon } from "../icons/ChatIcon";

//@ts-ignore
export const TopBar = ({children}) => {
  return (
    <div className="flex h-screen scale transition-all duration-300 justify-center items-center">
      <div className="container m-2 text-white border border-white/15 px-8 py-6 rounded-2xl w-2xl max-w-2xl">
        <div>
          <div className="flex items-center gap-1">
            <ChatIcon />
            <div className="text-white font-semibold text-2xl">
              Real Time Chat -*<b>Version 4</b>*- 
            </div>
          </div>
          <div className="text-secondary text-sm mt-1 mb-6">
            temporary room that expires after all users exit =) (Testing for CI)
          </div>
            {children}
        </div>
      </div>
    </div>
  );
};
