import React, { useState } from "react";
import {
  MDXEditor,
  headingsPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  listsPlugin,
  toolbarPlugin,
  ListsToggle,
  linkPlugin,
  CreateLink,
  linkDialogPlugin,
  BlockTypeSelect,
  quotePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

// Use forwardRef to pass the ref to MDXEditor
const Editor = React.forwardRef(({ handleContent }, ref) => {
  const [content, setContent] = useState("### What's on your mind, User?");

  return (
    <div className="my-3">
      <MDXEditor
        ref={ref}
        className="prose text-white"
        markdown={content}
        onBlur={() => handleContent(content)}
        onChange={setContent}
        plugins={[
          headingsPlugin(),
          markdownShortcutPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          toolbarPlugin({
            toolbarClassName: "mdx-tools",
            toolbarContents: () => (
              <>
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <CreateLink />
                <BlockTypeSelect />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
});

export default Editor;
