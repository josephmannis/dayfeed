import styled from "styled-components";

export const FeedSelect = styled.div.attrs({className: 'bb w-100 b--light-gray mb4'})``

interface FeedWrapperProps {
    error: boolean;
}

export const FeedWrapper = styled.div.attrs(
    (props: FeedWrapperProps) => (
        { className: props.error ? 'flex justify-center content-center mb4 br4 ba ph7 min-h-100 b--light-gray' : '' }
    ))<FeedWrapperProps>``