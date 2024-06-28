import { useNavigate, useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";
import { useGetPetQuery } from "./petApiService";

const Details = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data: pet } = useGetPetQuery(id);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <h1>{pet.name}</h1>
      <h2>
        {pet.animal} — {pet.breed} — {pet.city}, {pet.state}
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </h2>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
