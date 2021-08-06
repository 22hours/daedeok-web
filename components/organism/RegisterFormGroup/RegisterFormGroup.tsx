import style from "./RegisterFormGroup.module.scss";
import TextInput from "@ui/input/TextInput";
import PageHeader from "@ui/PageHeader";
import { FirebaseProvider } from "store/FirebaseStore";
import Typo from "@ui/Typo";
import Button from "@ui/buttons/Button";
import Select from "@ui/input/Select";
import CheckBox from "@ui/input/CheckBox";

type Props = {};

type SectionProps = {
    helpText?: string;
    children: JSX.Element | JSX.Element[];
};
const InputSection = (props: SectionProps) => {
    return (
        <div className={style.InputSection}>
            <div className={style.section_body}>{props.children}</div>
            {props.helpText && <Typo type={"TEXT"} size={"smaller"} color={"gray_accent"} content={props.helpText} />}
        </div>
    );
};

const RegisterFormGroup = () => {
    return (
        <FirebaseProvider>
            <div className={style.container}>
                <PageHeader title={"회원가입"} isUnderbar />

                <div>
                    <InputSection helpText={"휴대폰 번호는 로그인 아이디로 사용됩니다"}>
                        <div className={style.phone_num_row}>
                            <TextInput
                                className={style.register_form}
                                type={"text"}
                                form={"box"}
                                placeholder={"휴대폰 번호"}
                                disable
                            />
                            <Button
                                type={"SQUARE"}
                                size={"free"}
                                fontSize={"smaller"}
                                content={"본인 인증"}
                                className={style.register_button}
                            />
                        </div>
                    </InputSection>
                    <InputSection>
                        <TextInput className={style.register_form} type={"text"} form={"box"} placeholder={"이름"} />
                    </InputSection>
                    <InputSection helpText={"비밀번호는 8자이상 영문/숫자를 조합하여 생성해주세요"}>
                        <div className={style.password_row}>
                            <TextInput
                                className={style.register_form}
                                type={"password"}
                                form={"box"}
                                placeholder={"비밀번호"}
                            />
                            <TextInput
                                className={style.register_form}
                                type={"password"}
                                form={"box"}
                                placeholder={"비밀번호 확인"}
                            />
                        </div>
                    </InputSection>
                    <InputSection>
                        <TextInput className={style.register_form} type={"text"} form={"box"} placeholder={"직분"} />
                    </InputSection>
                    <InputSection>
                        <div className={style.select_row}>
                            <Select
                                className={style.register_form}
                                form={"box"}
                                option_list={[]}
                                placeholder={"상위 소속 선택"}
                            />
                            <Select
                                className={style.register_form}
                                form={"box"}
                                option_list={[]}
                                placeholder={"하위 소속 선택"}
                            />
                        </div>
                    </InputSection>
                    <InputSection>
                        <div className={style.agree_row}>
                            <CheckBox
                                className={style.register_form}
                                labelContent={"대덕바이블아카데미 이용약관 동의"}
                                isLabelRight
                            />
                            <CheckBox
                                className={style.register_form}
                                labelContent={"개인정보 처리방침 동의"}
                                isLabelRight
                            />
                        </div>
                    </InputSection>
                    <div className={style.call_row}>
                        <Typo
                            type={"TEXT"}
                            size={"smaller"}
                            color={"gray_accent"}
                            content={"회원가입 문의사항 : 042-861-3846"}
                        />
                    </div>
                    <div className={style.submit_row}>
                        <Button
                            type={"ROUND"}
                            size={"medium"}
                            fontSize={"small"}
                            content={"완료"}
                            backgroundColor={"mint_accent"}
                            color={"white"}
                        />
                    </div>
                </div>
            </div>
        </FirebaseProvider>
    );
};

export default RegisterFormGroup;
