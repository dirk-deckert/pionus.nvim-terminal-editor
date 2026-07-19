const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const Module = require("node:module");

const originalLoad = Module._load;
Module._load = function mockVscode(request, parent, isMain) {
    if (request === "vscode") {
        return {};
    }
    return originalLoad.call(this, request, parent, isMain);
};
const { __test } = require("../extension.js");
Module._load = originalLoad;

test("converts UTF-16 cursor positions to Neovim UTF-8 byte columns", () => {
    assert.equal(__test.toNvimByteColumn("aéb", 2), 4);
});

test("accepts local and VS Code userdata paths only", () => {
    assert.equal(__test.localFilePath({ uri: { scheme: "file", fsPath: "/tmp/a b.md" } }), "/tmp/a b.md");
    assert.equal(__test.localFilePath({ uri: { scheme: "untitled", fsPath: "/tmp/a" } }), undefined);
});

test("discovers an executable through PATH, including paths with spaces", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "pionus nvim "));
    const executable = path.join(directory, "nvim-test");
    fs.writeFileSync(executable, "#!/bin/sh\nexit 0\n", { mode: 0o755 });
    const oldPath = process.env.PATH;
    process.env.PATH = directory;
    try {
        assert.equal(__test.resolveExecutable("nvim-test"), executable);
        assert.equal(__test.resolveNvimPath(["nvim-test"]), executable);
        assert.equal(__test.resolveNvimPath([]), undefined);
    } finally {
        process.env.PATH = oldPath;
        fs.rmSync(directory, { recursive: true });
    }
});

test("recognizes Excalidraw resources", () => {
    assert.equal(__test.isExcalidrawPath("drawing.excalidraw"), true);
    assert.equal(__test.isExcalidrawPath("drawing.excalidraw.json"), true);
    assert.equal(__test.isExcalidrawPath("drawing.json"), false);
});
