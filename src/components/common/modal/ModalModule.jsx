import React from 'react';
import Modal from 'react-modal';
import styled, {css} from 'styled-components';
import '../../../lib/styles/Modal.css';
import MapContainer from 'components/Canvas/BuildTab/Map/MapContainer';
import BlackCustomBtn from 'components/Canvas/common/BlackCustomBtn';
import Close from "../../../lib/Icons/Close";

const StyledModal = styled(Modal)`
    display: flex;
    @media screen and (max-width: 767px) {
        flex-direction: column-reverse;
        justify-content: center;
    }
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    animation: modal-show 0.3s;
    @media screen and (max-width: 767px) {
        overflow: auto;
        margin-top: 15px;
        margin-bottom: 15px;
    }
`;

const Main = styled.main`
    border: none;
    ${(props) =>
            props.map === 'moveLoc' &&
            css`
                width: 90vw;
            `}

    padding: 16px;

    max-height: 80vh;
    overflow: auto;

    @media screen and (max-width: 767px) {
        overflow: auto;
        flex: 1;
        justify-content: center;
    }

    ${(props) =>
            props.img === 'img' &&
            css`
                padding: 0px;
                @media screen and (max-width: 767px) {
                    width: 100%;
                }
            `}
`;

const Section2 = styled.div`
    width: 50vw;
    margin-right: 20px;
    margin-left: 10px;
    border-radius: 0.3rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;

    @media screen and (max-width: 767px) {
        margin: 15px 0px 15px 15px;
        width: 100%;
        /* margin: 0; */
        display: flex;
        flex-direction: column;
    }
`;

const Div = styled.div`
    @media screen and (max-width: 767px) {
        height: 40vh;
    }
`;

const Btn = styled.div`
    display: flex;
    justify-content: center;
    padding: 12px 16px;
    text-align: right;
`;

const ModalModule = ({
                         modalIsOpen,
                         closeModal,
                         children,
                         title,
                         map,
                         onSubmit,
                         onSelect,
                         onClickAddress,
                         blockSelect,
                         isSel,
                         img,
                     }) => {
    return (
        <StyledModal
            className={modalIsOpen ? 'openModal modal' : 'modal'}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            <Section>
                <Header>
                    <div>{title}</div>
                    <Close size="20" onClick={closeModal} tooltip={false}/>
                </Header>
                <Main map={map} img={img}>
                    {children}
                </Main>
                {onSubmit && (
                    <Btn>
                        <BlackCustomBtn onClick={onSubmit} value="Menyelesaikan" color="black"/>
                    </Btn>
                )}
                {blockSelect && (
                    <Btn>
                        <BlackCustomBtn onClick={blockSelect} value={isSel} color="black"/>
                    </Btn>
                )}
            </Section>
            {map === 'memberLoc' && (
                <Section2>
                    <Div>
                        <Header>
                            <div>Peta</div>
                            <Close size="20" onClick={onClickAddress} tooltip={false}/>
                        </Header>
                        <MapContainer onSelect={onSelect}/>
                    </Div>
                </Section2>
            )}
        </StyledModal>
    );
};

export default ModalModule;
