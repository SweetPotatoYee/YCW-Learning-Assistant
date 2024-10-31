// �Ĥ@���� - �۰ʸ���
(function() {
    const currentUrl = window.location.href;

    if (currentUrl === "https://example.com") {
        setTimeout(() => {
            window.location.href = "https://example2.com";
        }, 3000); // 3������
    } else if (currentUrl.startsWith("https://example2.com")) {
        setTimeout(() => {
            window.location.href = "https://example3.com";
        }, 3000); // 3������
    }
})();

// �ĤG���� - alwaysOnFocus
(function() {
    unsafeWindow.onblur = null;
    unsafeWindow.blurred = false;

    unsafeWindow.document.hasFocus = () => true;
    unsafeWindow.window.onFocus = () => true;

    // ���� visibility �������ݩ�
    ["hidden", "mozHidden", "msHidden", "webkitHidden"].forEach(prop_name => {
        Object.defineProperty(document, prop_name, { value: false });
    });

    Object.defineProperty(document, "visibilityState", { get: () => "visible" });
    Object.defineProperty(document, "webkitVisibilityState", { get: () => "visible" });

    unsafeWindow.document.onvisibilitychange = undefined;

    // �]�w�ƥ��d�I
    const blurWhitelist = [
        HTMLInputElement,
        HTMLAnchorElement,
        HTMLSpanElement,
        HTMLParagraphElement,
    ];

    const hoverBlacklist = [
        HTMLIFrameElement,
        HTMLHtmlElement,
        HTMLBodyElement,
        HTMLHeadElement,
        HTMLFrameSetElement,
        HTMLFrameElement
    ];

    var event_handler = (event) => {
        if (event.type === 'blur' &&
            ((blurWhitelist.some(type => event.target instanceof type) ||
                event.target.classList?.contains('ql-editor')))) {
            return;
        }
        if (['mouseleave', 'mouseout'].includes(event.type) &&
            !hoverBlacklist.some(type => event.target instanceof type)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    };

    ["visibilitychange", "webkitvisibilitychange", "blur", "hasFocus", "mouseleave", "mouseout", 
     "mozvisibilitychange", "msvisibilitychange"].forEach(event_name => {
        window.addEventListener(event_name, event_handler, true);
        document.addEventListener(event_name, event_handler, true);
    });
})();
