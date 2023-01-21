import React,{useState,useEffect} from 'react'
// import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function RichText({text,setText,placeholder,width='98%',height="100px"}) {

    return (
        <div style={{
            // border:'1px solid #e2e2e2',
            width:width
        }}>
            <CKEditor
                editor={ClassicEditor}
                config={ {
                  
                } }
                data={text && text ===''?placeholder:text}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                    editor.editing.view.change((writer) => {
                        writer.setStyle(
                            "min-height",
                            height,
                            editor.editing.view.document.getRoot()
                        );
                        });
                }}
                onChange={(event, editor) => {
                    const newdata = editor.getData();
                    setText(newdata)
                    console.log({ newdata });
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
            />
        </div>
    )
}

export default RichText