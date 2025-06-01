"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
function Home() {
    return (<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h2>Tasks Manager</h2>
        </div>
        <div>
          <form action="#" method="">
            <div></div>
            <div></div>
            <div></div>
          </form>
          <p>
            Not a member?
            <a href="#">Register</a>
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>LibHeros technical test 2025</p>
        <p>Yohan Dunon</p>
      </footer>
    </div>);
}
