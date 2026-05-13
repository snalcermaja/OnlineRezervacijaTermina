import { Document, Packer, Paragraph, Tab, TextRun } from "docx"
import { saveAs } from "file-saver";

export default function Test() {


    function generate() {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun("Hello World"),
                                new TextRun({
                                    text: "Foo Bar",
                                    bold: true
                                }),
                                new TextRun({
                                    text: "\tGithub is the best",
                                    bold: true
                                })
                            ]
                        })
                    ]
                }
            ]
        });

        Packer.toBlob(doc).then((blob) => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    }



    return (
        <>
            <h1>DOCX browser Word document generation</h1>

            <button type="button" onClick={generate}>Click to generate document</button>
        </>
    )
}