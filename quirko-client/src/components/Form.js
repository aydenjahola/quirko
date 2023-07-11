import React from "react";
import { nanoid } from "nanoid";
import { getDatabase, child, ref, set, get } from "firebase/database";
import { isWebUri } from "valid-url";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./Form.css";
import Navbar from "./NavBar";
import { AuthContext } from "../contexts/AuthContext";

class Form extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      longURL: "",
      preferedAlias: "",
      generatedURL: "",
      loading: false,
      errors: [],
      errorMessage: {},
      toolTipMessage: "Copy To Clip Board",
    };
  }

  // When the user clicks submit, this will be called
  onSubmit = async (event) => {
    event.preventDefault(); // Prevents the page from reloading when submit is clicked
    this.setState({
      loading: true,
      generatedURL: "",
    });

    // Validate the input the user has sumbitted
    var isFormValid = await this.validateInput();
    if (!isFormValid) {
      return;
    }

    // If the user has input a prefered alias then we use it, if not, we generate one
    var generatedKey = nanoid(5);
    var generatedURL = "https://www.quirko.me/" + generatedKey;

    if (this.state.preferedAlias !== "") {
      generatedKey = this.state.preferedAlias;
      generatedURL = "https://www.quirko.me/" + this.state.preferedAlias;
    }

    const db = getDatabase();
    set(ref(db, "/" + generatedKey), {
      generatedKey: generatedKey,
      longURL: this.state.longURL,
      preferedAlias: this.state.preferedAlias,
      generatedURL: generatedURL,
    })
      .then((result) => {
        this.setState({
          generatedURL: generatedURL,
          loading: false,
        });
      })
      .catch((e) => {});
  };

  // Checks if feild has an error
  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  // Save the content of the form as the user is typing!
  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  validateInput = async () => {
    var errors = [];
    var errorMessages = this.state.errorMessage;

    // Validate Long URL
    if (this.state.longURL.length === 0) {
      errors.push("longURL");
      errorMessages["longURL"] = "Please enter your URL!";
    } else if (!isWebUri(this.state.longURL)) {
      errors.push("longURL");
      errorMessages["longURL"] = "Please a URL in the form of https://www....";
    }

    // Prefered Alias
    if (this.state.preferedAlias !== "") {
      if (this.state.preferedAlias.length > 7) {
        errors.push("suggestedAlias");
        errorMessages["suggestedAlias"] =
          "Please Enter an Alias less than 7 Characters";
      } else if (this.state.preferedAlias.indexOf(" ") >= 0) {
        errors.push("suggestedAlias");
        errorMessages["suggestedAlias"] = "Spaces are not allowed in URLS";
      }

      var keyExists = await this.checkKeyExists();

      if (keyExists.exists()) {
        errors.push("suggestedAlias");
        errorMessages["suggestedAlias"] =
          "The Alias you have entered already exists! Please enter another one =-)";
      }
    }

    this.setState({
      errors: errors,
      errorMessages: errorMessages,
      loading: false,
    });

    if (errors.length > 0) {
      return false;
    }

    return true;
  };

  checkKeyExists = async () => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `/${this.state.preferedAlias}`)).catch((error) => {
      return false;
    });
  };

  copyToClipBoard = () => {
    navigator.clipboard.writeText(this.state.generatedURL);
    this.setState({
      toolTipMessage: "Copied!",
    });
  };

  render() {
    const { currentUser } = this.context;

    return (
      <div>
        <Navbar currentUser={currentUser} />
        <div className="container">
          <form autoComplete="off">
            <h3>Quirko - URL Shortener Tool</h3>

            <div className="form-group">
              <label>Enter Your Long URL</label>
              <input
                id="longURL"
                onChange={this.handleChange}
                value={this.state.longURL}
                type="url"
                required
                className={
                  this.hasError("longURL")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="https://www..."
              />
            </div>
            <div
              className={
                this.hasError("longURL") ? "text-danger" : "visually-hidden"
              }
            >
              {this.state.errorMessage.longURL}
            </div>

            <div className="form-group">
              <label htmlFor="basic-url">Your Mini URL</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">quirko.me/</span>
                </div>
                <input
                  id="preferedAlias"
                  onChange={this.handleChange}
                  value={this.state.preferedAlias}
                  className={
                    this.hasError("preferedAlias")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                  placeholder="eg. 9tase (Optional)"
                />
              </div>
              <div
                className={
                  this.hasError("suggestedAlias")
                    ? "text-danger"
                    : "visually-hidden"
                }
              >
                {this.state.errorMessage.suggestedAlias}
              </div>
            </div>

            <button className="button" type="button" onClick={this.onSubmit}>
              {this.state.loading ? (
                <div>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              ) : (
                <div>
                  <span
                    className="visually-hidden spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span>Shorten URL</span>
                </div>
              )}
            </button>

            {this.state.generatedURL === "" ? (
              <div></div>
            ) : (
              <div className="generatedurl">
                <span>Your generated URL is: </span>
                <div className="input-group mb-3">
                  <input
                    disabled
                    type="text"
                    value={this.state.generatedURL}
                    className="form-control"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id={`tooltip-${"top"}`}>
                          {this.state.toolTipMessage}
                        </Tooltip>
                      }
                    >
                      <button
                        onClick={() => this.copyToClipBoard()}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tooltip on top"
                        className="btn btn-outline-secondary"
                        type="button"
                      >
                        Copy
                      </button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            )}

            <footer className="footer">
              <div className="footer-content">
                <div className="made-by">Made with ❤️ by Ayden</div>
                <div className="social-icons">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/aydenjahola"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.twitter.com/Ayden_Jahola"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/ayden-jahola"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
