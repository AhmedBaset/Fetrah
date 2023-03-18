import { useState, useEffect } from "react";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update, getQuestions } from "../../actions/user";

const ProfileUpdateQuestions = (props) => {
  const [questions, setQuestions] = useState();
  const [userAnswers, setUserAnswers] = useState();
  const token = getCookie("token");

  const [values, setValues] = useState({
    error: false,
    success: false,
    loading: false,
  });

  const { error, success, loading } = values;

  const handleChange = (questionId) => (e) => {
    setUserAnswers({ ...userAnswers, [questionId]: e.target.value });
  };

  const showQuestionsForm = () => {
    if (userAnswers) {
      return (
        <div className="row-md-12">
          <div className="col-md-8">
            <div className="form-group">
              <label className="text-muted">{questions["0"]}</label>
              <input
                onChange={handleChange(0)}
                type="text"
                value={`${userAnswers["0"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["1"]}</label>
              <input
                onChange={handleChange(1)}
                type="text"
                value={`${userAnswers["1"]}`}
                className="form-control"
              />
            </div>

            {userAnswers["2"] === "" ? (
              ""
            ) : (
              <>
                <div className="form-group">
                  <label className="text-muted">{questions["2"]}</label>
                  <input
                    onChange={handleChange(2)}
                    type="Number"
                    value={`${userAnswers["2"]}`}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="text-muted">{questions["3"]}</label>
                  <input
                    onChange={handleChange(3)}
                    type="Number"
                    value={`${userAnswers["3"]}`}
                    className="form-control"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="text-muted">{questions["4"]}</label>
              <input
                onChange={handleChange(4)}
                type="Number"
                value={`${userAnswers["4"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["5"]}</label>
              <input
                onChange={handleChange(5)}
                type="Number"
                value={`${userAnswers["5"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["6"]}</label>
              <input
                onChange={handleChange(6)}
                type="Number"
                value={`${userAnswers["6"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["7"]}</label>
              <input
                onChange={handleChange(7)}
                type="Number"
                value={`${userAnswers["7"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["8"]}</label>
              <input
                onChange={handleChange(8)}
                type="Number"
                value={`${userAnswers["8"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["9"]}</label>
              <input
                onChange={handleChange(9)}
                type="Number"
                value={`${userAnswers["9"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["10"]}</label>
              <input
                onChange={handleChange(10)}
                type="Number"
                value={`${userAnswers["10"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["11"]}</label>
              <input
                onChange={handleChange(11)}
                type="Number"
                value={`${userAnswers["11"]}`}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-muted">{questions["12"]}</label>
              <input
                onChange={handleChange(12)}
                type="Number"
                value={`${userAnswers["12"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["13"]}</label>
              <input
                onChange={handleChange(13)}
                type="Number"
                value={`${userAnswers["13"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["14"]}</label>
              <input
                onChange={handleChange(14)}
                type="Number"
                value={`${userAnswers["14"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["15"]}</label>
              <input
                onChange={handleChange(15)}
                type="Number"
                value={`${userAnswers["15"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["16"]}</label>
              <input
                onChange={handleChange(16)}
                type="Number"
                value={`${userAnswers["16"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["17"]}</label>
              <input
                onChange={handleChange(17)}
                type="Number"
                value={`${userAnswers["17"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["18"]}</label>
              <input
                onChange={handleChange(18)}
                type="Number"
                value={`${userAnswers["18"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["19"]}</label>
              <input
                onChange={handleChange(19)}
                type="Number"
                value={`${userAnswers["19"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["20"]}</label>
              <input
                onChange={handleChange(20)}
                type="Number"
                value={`${userAnswers["20"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["21"]}</label>
              <input
                onChange={handleChange(21)}
                type="Number"
                value={`${userAnswers["21"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["22"]}</label>
              <input
                onChange={handleChange(22)}
                type="Number"
                value={`${userAnswers["22"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["23"]}</label>
              <input
                onChange={handleChange(23)}
                type="Number"
                value={`${userAnswers["23"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["24"]}</label>
              <input
                onChange={handleChange(24)}
                type="Number"
                value={`${userAnswers["24"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["25"]}</label>
              <input
                onChange={handleChange(25)}
                type="Number"
                value={`${userAnswers["25"]}`}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">{questions["26"]}</label>
              <input
                onChange={handleChange(26)}
                type="Number"
                value={`${userAnswers["26"]}`}
                className="form-control"
              />
            </div>
          </div>
        </div>
      );
    }
    return <>loading...</>;
  };

  const init = () => {
    getQuestions().then((data) => {
      setQuestions(data);
      setValues({ ...values, error: data.error });
    });
    getProfile(token).then((data) => {
      if (data.error) {
      } else {
        setUserAnswers(data.questions);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    const userData = new FormData();
    userData.set("questions", JSON.stringify(userAnswers));

    update(token, userData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Profile updated
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );

  return (
    <>
      {showQuestionsForm()}
      <div>
        {showSuccess()}
        {showError()}
        {showLoading()}
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Update questions
      </button>
    </>
  );
};

export default ProfileUpdateQuestions;
