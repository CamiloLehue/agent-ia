import clsx from "clsx";
import React from "react";

type CardUiProps = {
  children: React.ReactNode;
  className?: string;
};

function CardUi({ children, className }: CardUiProps) {
  return (
    <div className={clsx("relative flex flex-col justify-start items-start ", className)}>
      <OuterContainer>
        <TopBlurDecorations />
        <MiddleContainer>
          <InnerContainer>
            <CornerDecorations />
            <CenterHighlights />
            <ContentWrapper>{children}</ContentWrapper>
          </InnerContainer>
        </MiddleContainer>
      </OuterContainer>
    </div>
  );
}

export default CardUi;


function OuterContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full min-w-50 bg-bg p-0.5 ">
      {children}
    </div>
  );
}

function TopBlurDecorations() {
  return <div className="w-full h-10 absolute top-0 left-0 bg-black blur opacity-50 rounded-full" />;
}

function MiddleContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-black w-full h-full rounded-2xl p-1 border-t border-accent/40">
      {children}
    </div>
  );
}

function InnerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-secondary w-full h-full rounded-2xl p-1.5 border-t border-white/20">
      {children}
    </div>
  );
}

function CornerDecorations() {
  return (
    <>
      <div className="absolute w-10 h-10 bg-black top-0 left-0 blur opacity-20" />
      <div className="absolute w-5 max-h-20 bg-white top-0.5 left-2 blur-xs opacity-20" />
      <div className="absolute w-5 max-h-20 bg-white top-0.5 right-2 blur-xs opacity-20" />
      <div className="absolute w-10 h-10 bg-black top-0 right-0 blur opacity-20" />
      <div className="absolute w-10 h-10 bg-black bottom-0 right-0 blur opacity-30" />
      <div className="absolute w-10 h-10 bg-black bottom-0 left-0 blur opacity-30" />
    </>
  );
}

function CenterHighlights() {
  return (
    <>
      <div className="absolute left-[50%] -translate-x-1/2 w-[calc(100%-1rem)] h-2 top-1.5 bg-white blur-xs opacity-40" />
      <div className="absolute left-[50%] -translate-x-1/2 w-[calc(100%-2.6rem)] h-5 bottom-2 bg-secondary blur-xs opacity-100" />
    </>
  );
}

function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative bg-bgt border-2 border-black/80 
        border-s border-s-secondary/20 
        border-e border-e-secondary/20 
        border-b border-b-transparent 
        shadow-lg shadow-bgp/30 w-full h-full 
        rounded-xl overflow-hidden"
    >
      <div className="absolute left-0 w-full  bottom-0 bg-gradient-to-b from-black/50 blur" />
      <div className="absolute left-[50%] -translate-x-1/2 w-[calc(100%-2rem)] h-4 bottom-0 bg-gradient-to-t from-white blur-md opacity-20" />
      <div className="absolute left-[50%] -translate-x-1/2 w-[calc(100%-6rem)] h-2 -bottom-0.5 bg-gradient-to-b from-white opacity-20 blur-md" />
      <div className="absolute left-[50%] -translate-x-1/2 w-[calc(100%-2rem)] h-6 rounded-full -bottom-0.5 bg-gradient-to-b from-white blur-2xl opacity-45" />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}