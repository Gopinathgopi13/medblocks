import type { FormikErrors } from "formik";

export interface StyledTextProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    readMore?: boolean;
    maxLength?: number;
}

export interface TextInputBoxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    value: string;
    onChangeText?: (val: string) => void;
    type?: 'text' | 'password' | 'email';
    isRequired?: boolean;
    errorText?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
    placeholder?: string;
    isSecureText?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    options?: TextInputBoxOptionType[];
    onOptionSelect?: (selectedOption: TextInputBoxOptionType) => void;
    optionLabel?: string;
    getOptionLabel?: (option: TextInputBoxOptionType) => string;
}

export interface TableHeaderActionProps {
    id: string | number;
    icon: 'Add' | 'Refresh' | 'Upload' | 'Download' | 'Filter';
    isDisabled?: boolean;
    label?: string;
  }


export interface TableHeaderProps {
    title?: string;
    subtitle?: string;
    actions?: TableHeaderActionProps[];
    onActionPress?: (action: TableHeaderActionProps) => void;
    customAction?: ReactNode;
    isAnimatedLabel?: boolean;
}

export interface TablePaginationProps {
    current: number;
    pageSize: number;
    total: number;
    pageSizeOptions?: number[];
    onChange: (page: number, pageSize: number) => void;
}

export interface TableProps<T> {
    columns: ColumnType<T>[];
    data: T[];
    rowKey?: keyof T;
    striped?: boolean;
    responsive?: boolean;
    className?: string;
    onRowClick?: (record: T, index: number) => void;
    pagination?: TablePaginationProps | false;
    isLoading?: boolean;
    headerActions?: Omit<TableHeaderProps, 'children'>;
    isHeaderEnable?: boolean;
    isShowSerialNo?: boolean;
    isSearchEnable?: boolean;
    searchText?: string;
    setSearchText?: (text: string) => void;
    isFilterEnable?: boolean;
    onPressFilter?: () => void;
    isLocalPaginate?: boolean;
}

export interface SelectProps<T extends OptionType> {
    options: T[];
    value: T | T[] | null|undefined;
    onChange: (value: T | T[] | null) => void;
    isMulti?: boolean;
    isSearchable?: boolean;
    isClearable?: boolean;
    placeholder?: string;
    getOptionLabel?: (option: T) => string;
    getOptionValue?: (option: T) => string | number;
    menuPlacement?: Placement;
    className?: string;
    errorText?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
    isRequired?: boolean;
    title?: string;
    inputContainerStyle?: string;
    isCreate?: boolean;
    onCreateOption?: (label: string) => T;
    rightTitleText?: string;
    onRightTitleText?: () => void;
    createLabel?: string;
    isDisabled?: boolean;
}

export interface OptionType {
    [key: string]: any;
}


export interface TextInputBoxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    value: string;
    onChangeText?: (val: string) => void;
    type?: 'text' | 'password' | 'email';
    isRequired?: boolean;
    errorText?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
    placeholder?: string;
    isSecureText?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    options?: TextInputBoxOptionType[];
    onOptionSelect?: (selectedOption: TextInputBoxOptionType) => void;
    optionLabel?: string;
    getOptionLabel?: (option: TextInputBoxOptionType) => string;
}

export interface PhoneInputProps
    extends Omit<TextInputBoxProps, 'onChangeText' | 'value'> {
    countryCode?: number;
    value?: string;
    onChange?: (phone: string, country: any) => void;
    title?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    variant?: 'solid' | 'outline';
    onPress?: () => void;
    isDisabled?: boolean;
    isSolidEffect?: boolean;
    isOutlineEffect?: boolean;
    className?: string;
}

type ScrollBehavior = 'body' | 'viewport';


type ModalSizeProps =
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full'
    | 'screen-sm'
    | 'screen-md'
    | 'screen-lg'
    | 'screen-xl'
    | 'screen-2xl';


export interface ModalProps {
    open: boolean;
    title?: string;
    isHeaderEnable?: boolean;
    isFooterEnable?: boolean;
    onCancel?: (isClose?: boolean) => void;
    onSubmit?: () => void;
    children: ReactNode;
    positiveBtnText?: string;
    negativeBtnText?: string;
    scrollBehavior?: ScrollBehavior;
    size?: ModalSizeProps;
}

export interface LoaderProps {
    isVisible: boolean;
    text?: string;
  }
  