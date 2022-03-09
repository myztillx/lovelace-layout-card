import { LAYOUT_CARD_SELECTOR_OPTIONS } from "../helpers";

customElements.whenDefined("hui-view-editor").then(() => {
  const HuiViewEditor = customElements.get("hui-view-editor");

  const firstUpdated = HuiViewEditor.prototype.firstUpdated;
  HuiViewEditor.prototype.firstUpdated = function () {
    firstUpdated?.bind(this)();

    this._oldSchema = this._schema;
    this._schema = (localize) => {
      const retval = this._oldSchema(localize);
      const typeSelector = retval[retval.length - 1];
      if (typeSelector.name === "layout") return retval;
      typeSelector.selector.select.options.push(
        ...LAYOUT_CARD_SELECTOR_OPTIONS
      );
      retval.push({
        name: "layout",
        selector: { object: {} },
      });
      return retval;
    };

    const helpLink = document.createElement("p");
    helpLink.innerHTML = `
      You have layout-card installed which adds some options to this dialog. <br/>
      Please see
        <a
          href="https://github.com/thomasloven/lovelace-layout-card"
          target="_blank"
          rel="no referrer"
        >
          layout-card on github
        </a>
        for usage instructions.
        <style>
          p {padding: 16px 0 0; margin-bottom: 0;}
          a {color: var(--primary-color);}
        </style>
    `;
    this.shadowRoot.appendChild(helpLink);
    this.requestUpdate();
  };
});
